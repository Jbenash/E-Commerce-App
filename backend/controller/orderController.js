import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";


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
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.status(200).json({ success: true, message: "Succesfully stored ", orderId: newOrder._id })


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



//all orders data for admin panel
const allOrders = async (req, res) => {
  try {

    const orderData = await orderModel.find({})
    if (!orderData || orderData.length == 0) return res.status(404).json({ success: false, message: "order data not found" })

    res.status(200).json({ success: true, orderData })




  } catch (error) {
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

  } catch (error) {
    console.error(error);
  }
}

export { placeOrder, allOrders, updateStatus, userOrders }