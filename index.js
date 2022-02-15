const express = require('express')
const app = express()

const server = app.listen(8000, () => {
    console.log('Server is up and listening on port 8000')
})

app.use(express.static('public'))

