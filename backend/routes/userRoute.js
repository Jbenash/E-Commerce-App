import express from 'express'
import { registerUser, login, adminLogin } from '../controller/userController.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.post('/admin', adminLogin)

export default userRouter

