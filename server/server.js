// 1.In react, we use import experts from experts that tell you.
// But in node js, you can't do that because not just doesn't support this import export syntax yet,
// const express = require("express");

// 1.1 when we use esm we can you this way 
import express from 'express'
//import router from './routes/auth'
import { readdirSync } from 'fs'
import cors from 'cors'
const morgan = require("morgan")
require("dotenv").config();
import mongoose from 'mongoose'

// 2.this variable app will invok this function express()
const app = express();

// 3. so this server gives us a lot of properties and methods which will help us build up our server
/*
app.get('/api/:message', (req , res) => {

    res.status(200).send(`Hello there that is your messsage ${req.params.message}`)
})
*/
//first it's not working but after acced to node_modules/mongoose and install with npm i --production
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology:true, 
    useCreateIndex:true,
}).then(() => console.log("DB Connected")).catch((err) => console.log("DB Connection Error: ",err));


// erreurs
app.use(cors())
// to can see what we've received a get request and that is the endpoint EPS less message, which is a dynamic
app.use(morgan("dev"))

app.use(express.json());

/*The reason we are using SYNC because we want to make sure we read all the rules.
this function takes the direct name which we want to read.
we can map through all the files that are there.
*/
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))
// router middleware : function that run in the middle
/*app.use("/api", router)*/

const  port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`))