import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import userModel from '../model/userModel.js';
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, cb)=> {
    try{
      let user=await userModel.findOneAndUpdate({ googleId: profile.id })
      if(!user){
            user=await userModel.create({
            userName:profile.displayName,
            email:profile.emails[0].value,
            googleId:profile.id,
            avatar:profile.photos[0].value
        })
      }
      return cb(null,user)
    }
   
    catch(err){
        return cb(err,null)
    }
}
  

));
