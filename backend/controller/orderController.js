import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";


//placing order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const {items, amount, shoppingInfo } = req.body
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

//placing order using card
const placeOrderCard = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  }
}

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  }
}


//user order Data for frontend
const userOrder = async (params) => {
  try {
    // code here
  } catch (error) {
    console.error(error);
  }
}

//update order status from admin panel 
const updateStatus = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
  }
}

export { placeOrder, placeOrderCard, allOrders, updateStatus, userOrder }