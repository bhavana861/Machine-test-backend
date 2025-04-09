// Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

// Create express application.express function is to resolve request from the client.put it in a variable name mtServer.
const mtServer = express()

// Enabling cors in mtServer using use() method.cors is used to data sharing
mtServer.use(cors())
// Using json parser in Server.
mtServer.use(express.json())
mtServer.use(router)


// Creating PORT num as 3000 to run server
const   PORT = 3000 || process.env.PORT

mtServer.listen(PORT,()=>{
    console.log(`Server is started at port no:${PORT}!!!`);
    
})

// http://localhost:3000/ - resolving get request 
mtServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:yellow">Server is started at port no:${PORT}!!!</h1>`)
})

