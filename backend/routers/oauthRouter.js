import passport from 'passport'
import jwt from 'jsonwebtoken'
import express from 'express'
import oAuth from '../middleware/oAuth.js'

const oauthRouter=express.Router()
oauthRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))
oauthRouter.get('/google/callback',passport.authenticate('google',{session:false}),
(req,res)=>{
    try{
        const token=jwt.sign({id:req.user._id,email:req.user.email},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`)
    }
    catch(err){
        console.error(err)
        res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
    }
})
oauthRouter.get('/me',oAuth,(req,res)=>{
    res.json({success:true,user:req.user})
    console.log('hello')

})
export default oauthRouter