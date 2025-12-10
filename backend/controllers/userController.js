import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodeMailer.js"
const register=async(req,res)=>{
    try{
        const {userName,email,password}=req.body
        if(!userName||!email||!password){
            return res.json({success:false,error:'fill all the form'})
        }
        const userExist=await userModel.findOne({email})
       
        if(userExist){
            return res.json({success:false,error:'user already exist'})
        }
        if(password?.length<8){
            return res.json({success:false,error:'password need to be greater than 8'})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        const newUser={
            userName,
            email,
            password:hashedPassword
        }
        const user=new userModel(newUser)
        await user.save()
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='production',
            sameSite:process.env.NODE_ENV=='production'?'none':'strict',
            maxAge:60*60*24*7*1000
        })
        return res.json({success:true,message:'user registered successfully',token})
       

    }
    catch(error){
        return res.json({success:false,message:error.message})
    }

}

const login=async(req,res)=>{
try{
    const {email,password}=req.body
    if(!email||!password){
        return res.json({success:false,error:'fill all the form'})
    }
    if(password.length<8){
        return res.json({success:false,error:'password need to be greater than 8'})
    }
    const userExist=await userModel.findOne({email})
    const compare=await bcrypt.compare(password,userExist.password)
    if(userExist&&compare){
        const token=jwt.sign({id:userExist._id},process.env.JWT_SECRET)
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV=='production',
            sameSite:process.env.NODE_ENV=='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true,message:'user logged in successfully',token})
        
    }
    else{
        return res.json({success:false,error:'your password is not matched'})
    }

}
catch(error){
    return res.json({success:false,message:error.message})
}

}



//sending verification to the email
const sendVerification=async (req,res)=>{
    
    try{
    const userId=req.user.id
    const user=await userModel.findById(userId)
    if(!user){
        console.log('user not found')
    }
   
    const otp=String(Math.floor(100000+Math.random()*900000))
    user.verificationOtp=otp
    user.verificationExp=Date.now()+3600*1000*24
    await user.save()
    const mailOption={
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:'Account verification',
        text:`your verification code is ${otp}, verify now`
        
    }
    await transporter.sendMail(mailOption)
   return  res.json({success:true,message:'Account verified'})}
    catch(error){
       return  res.json({success:false,message:error.message})
    }
}


//checking verification matched
const verifyEmail=async(req,res)=>{
    console.log('please work')
    const {otp}=req.body
    const userId=req.user.id
    if(!userId||!otp){
        return res.json({success:false,message:'userId and otp not found'})
    }
    
    try{
        const user=await userModel.findById(userId)
        if(!user){
            return res.json({success:false,message:'user not found'})
        }
        if(user.verificationOtp==''||user.verificationOtp!==otp){
            return res.json({success:false,message:'verification mismatch'})
        }
        if(user.verificationExp<Date.now()){
            return res.json({success:false,message:'expired date'})
        }
        user.verificationOtp=''
        user.verificationExp=0
        user.isVerified=false
        await user.save
        return res.json({success:true,message:'successfully verified'})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

//logout
const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:false,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict'
        })
        return res.json({success:true,message:'succesfuly logged out'})

    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}
export {register,login,sendVerification,verifyEmail,logout}

