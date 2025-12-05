import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from 'stripe'

//global variables 
const currency = 'LKR'
const delivery_charges = 10

//gateway initialize 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, shoppingInfo } = req.body
    if (!userId || !items || !amount || !shoppingInfo) {
      res.status(400).json({ success: false, message: "missing fields" })
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      shoppingInfo,
      paymentMethod: "COD",
      date: Date.now()

    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.status(200).json({ success: true, message: "Succesfully stored ", orderId: newOrder._id })


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//placing order using stripe
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, shoppingInfo } = req.body
    const { origin } = req.headers

    if (!origin) {
      return res.status(400).json({ success: false, message: "Origin header missing" });
    }
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      shoppingInfo,
      paymentMethod: "Stripe",
      date: Date.now()

    })

    await newOrder.save()

    const lineItems = items.map((items) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: items.name
        },
        unit_amount: items.price * 100
      },
      quantity: items.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: lineItems,
      mode: 'payment'
    })
    res.status(200).json({ success: true, session_url: session.url })

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.error(error);
  }
}

//verifiy stripe 

const verifyStripe = async (req, res) => {
  const userId = req.userId
  const { orderId, success } = req.body
  try {

    if (success == true) {
      await orderModel.findByIdAndUpdate(orderId, { paymentStatus: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
    }

    res.json({ success: true })

  } catch (error) {
    await orderModel.findByIdAndDelete(orderId)
    res.json({ success: false })
    console.error(error);
  }
}
const placeOrderRazerpay = async (req, res) => {
  try {
    // code here
  } catch (error) {
    console.error(error);
  }
}

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {

    const orderData = await orderModel.find({})
    if (!orderData || orderData.length == 0) return res.status(404).json({ success: false, message: "order data not found" })

    res.status(200).json({ success: true, orderData })

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });

    console.error(error);
  }
}


//user order Data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orderData = await orderModel.find({ userId })

    if (!orderData) return res.status(404).json({ success: false, message: "order data not found" })

    res.status(200).json({ success: true, orderData })



  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//update order status from admin panel 
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    if (!status) return res.status(404).json({ success: false, message: "order data not found" })

    const orderData = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })

    if (!orderData) return res.status(404).json({ success: false, message: "order data not found" })

    res.status(200).json({ success: true, message: "Order updated" })


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });

  }
}

export { placeOrder, allOrders, updateStatus, userOrders, placeOrderStripe, placeOrderRazerpay, verifyStripe }