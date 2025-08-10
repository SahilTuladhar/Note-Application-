import express from 'express'
import morgan from "morgan"
import cookieParser from 'cookie-parser'
import cors from "cors"

const app = express()

// Middlewares

app.use(morgan("dev"))

app.use( 
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5174" ,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'], 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' , "PATCH"]
    })
)

app.use(
    express.json({
        limit:"16kb"
    })
)

app.use(
    express.urlencoded({
        extended: true,
        limit:"16kb"
    })
)

app.use(
    cookieParser()
)

app.use(
    express.static('public')
)

app.use((err , req, res, next) => {
    console.error(err);

    if(err instanceof ApiError){
        return res
        .status(err.statusCode)
        .json({
            message:err.message
        })
    }

    res.status(500).json({ message: 'Internal Server Error' });
    
})

// Route Imports

import userRouter from './routes/users.route.js'
import noteRouter from './routes/notes.route.js'
import ApiError from './utils/ApiErrors.js'


app.use("/api/v1/users" , userRouter)
app.use("/api/v1/notes" , noteRouter)


export default app