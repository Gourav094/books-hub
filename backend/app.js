const path = require('path');
const express = require('express');
const app = express()
const cors = require('cors')
const { bookRouter } = require('./routes/books.routes');
const { userBooksRouter } = require('./routes/user.routes');
const { CLIENT_URL, backend_URL } = require('./constant');

const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const cookieSession = require('cookie-session')
const helmet = require('helmet');
const tokenExpired = require('./checkToken');
require('dotenv').config()

// allow cross-origin request providing with credentials
app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// middleware to serve frontend and backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// security middlewares
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY1: process.env.SECRET_KEY1,
    SECRET_KEY2: process.env.SECRET_KEY2
}

const AUTH_OPTIONS = {
    callbackURL: `${backend_URL}/auth/google/callback`,
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    scope: ['https://www.googleapis.com/auth/books']
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log("acess token ",accessToken)
    done(null, { profile: profile, accessToken: accessToken })
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

app.use(helmet())

app.use(cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SECRET_KEY1, config.SECRET_KEY2]
}))

app.use(passport.initialize())
app.use(passport.session())


function checkLogin(req, res, next) {
    const Login = req.user
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!Login && !accessToken) {
        return res.status(401).json({
            error: "You need to login !!"
        })
    }
    next()
}

// security endpoints
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/books', 'profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/failure',
    session: true
}), (req, res) => { console.log('authorization done') })


app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect(CLIENT_URL)
})

app.get('/login/success', async(req, res) => {
    if (req.user) {
        console.log(await tokenExpired(req?.user?.accessToken))
        if(await tokenExpired(req.user?.accessToken) === true){
            return res.status(401).json({error:"session timeout"})
        }
        res.status(200).json({
            success: true,
            message: "successfully login",
            user: req.user
        })
    }
})

app.get('/failure', (req, res) => {
    return res.status(400).json({
        error: "Oops! Getting error during login"
    })
})

// application middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.use(bookRouter)
app.use('/user', checkLogin, userBooksRouter)

module.exports = app