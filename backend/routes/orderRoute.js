import express from 'express'
import { allOrders, placeOrder, updateStatus, userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin features- only admin can do these
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//payment features
orderRouter.post('/place', authUser, placeOrder)

//user features 
orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter
