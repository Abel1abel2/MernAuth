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

const allowedOrigins = [
  'http://localhost:5173',
  'https://vercel.app' // Keep your production Vercel link here too
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow local requests, matching origins, and any dynamic vercel subdomains
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies/credentials to pass through safely
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Safe preflight OPTIONS interception for local & production route safety
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
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