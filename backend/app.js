const express = require('express');
const cors = require('cors')
const { bookRouter } = require('./routes/books.routes');
const app = express()
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const helmet = require('helmet')
require('dotenv').config()
const path = require('path');
const cookieSession = require('cookie-session')
const { userBooksRouter } = require('./routes/user.routes');
const { CLIENT_URL } = require('./constant');
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY1: process.env.SECRET_KEY1,
    SECRET_KEY2: process.env.SECRET_KEY2
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    scope: ['https://www.googleapis.com/auth/books']
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    done(null, { profile: profile, accessToken: accessToken })
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser((obj,done) => {
    done(null,obj)
})

app.use(helmet())

app.use(cookieSession({
    name:"session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SECRET_KEY1,config.SECRET_KEY2]
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


app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/books','profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/failure',
    session: true
}),(req,res) => {console.log('authorization done')})


app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect(CLIENT_URL)
 })

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/login/success',(req,res) => {
    if(req.user){
        res.status(200).json({
            success:true,
            message:"successfully login",
            user:req.user
        })
    }
})

app.get('/failure', (req, res) => {
    return res.status(400).json({
        error: "Oops! Getting error during login"
    })
})
app.use(bookRouter)
app.use('/user', checkLogin, userBooksRouter)

module.exports = app