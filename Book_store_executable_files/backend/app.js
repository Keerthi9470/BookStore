require('dotenv').config()

const mongoose = require('mongoose');
const express=require('express')
const app=express()
const bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
//My routes
const authRoutes =require("./routes/auth")
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const orderRoutes=require("./routes/order")
const paymentBRoutes=require("./routes/paymentBRoutes")
//DB connection
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=>{
    console.log("DB CONNECTED")
})

//middle ware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//routers
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",paymentBRoutes)
const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})
