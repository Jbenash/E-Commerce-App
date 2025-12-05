import express from 'express'
import { placeOrderRazerpay, placeOrderStripe, allOrders, placeOrder, updateStatus, userOrders, verifyStripe } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin features- only admin can do these
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazerpay)

//verify payment
orderRouter.post('/verify', authUser, verifyStripe)


//user features 
orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter
