import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: Array,
            required: true,
            default: 'Order placed'
        },
        paymentMethod: {
            type: String,
            required: true
        },
        payment: {
            type: boolean,
            required: true,
            default: false//by defalult payment should be false after making payment it should be true 
        },
        date: {
            type: Number,
            required: true,

        }
    }
)

const orderModel = mongoose.model("order", orderSchema)
export default orderModel