import express from 'express'
import { login, logout, register, sendVerification, verifyEmail } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js'
const router=express.Router()
router.post('/register',register)
router.post('/login',login)
router.post('/send',userAuth,sendVerification)
router.post('/verify',userAuth,verifyEmail)
router.post('/logout',logout)
export default router