const app = require('./app')

const PORT = 8000

app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})