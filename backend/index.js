import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoDB.js'
import router from './routers/userRouter.js'
import cookieParser from 'cookie-parser'
import oauthRouter from './routers/oauthRouter.js'
import './config/oauth.js'
const app=express()
const port=process.env.PORT
//connections
connectDb()

//thirdparty middlewares
app.use(express.json())
const allowedOrigin=['http://localhost:5173','https://mern-auth-frontend-silk.vercel.app/']
app.use(cors({origin:allowedOrigin,credentials:true}))
app.use(cookieParser())

//custome middlewares
app.get('/',(req,res)=>{
    res.send('hello people')
})
app.use('/api/user',router)
app.use('/auth',oauthRouter)

//listen server
app.listen(port,()=>{
    console.log(`server start at ${port}`)
})

export default app