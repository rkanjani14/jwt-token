import express from "express";
const app = express()
import Router from "./routes/web.js"
import connectDb from "./db/connectdb.js"
const DATABASE_URL = "mongodb://localhost:27017"
import jwt from "jsonwebtoken"
connectDb(DATABASE_URL)

const PORT = '3000'
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/",Router)


app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`)
})
