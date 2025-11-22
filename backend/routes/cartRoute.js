import express, { Router } from 'express'
import { addToCart, getToCart, updateToCart } from '../controller/carController'
import authUser from '../middleware/auth'


const cartRouter = express.Router()

cartRouter.post('/get', authUser, getToCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateToCart)


export default cartRouter