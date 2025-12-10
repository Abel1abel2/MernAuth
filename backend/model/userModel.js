import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    userName:{type:String},
    email:{type:String,required:true,unique:true},
    googleId:{type:String},
    avatar:{type:String},
    password:{type:String},
    verificationOtp:{type:String,default:''},
    verificationExp:{type:Number,default:0},
    isVerified:{type:Boolean,default:false}
})
const userModel= mongoose.user||new mongoose.model('user',userSchema)
export default userModel