import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, //defining that this is a object defined by mongoose which stores an object id 
            ref: "User", // ref is used to point to another model -this is pointing to the user model
            required: true
        },
        items: {
            type: Array,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true

            },
            quantity: { type: Number, required: true },
            size: { type: String },
            price: { type: Number, required: true },
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        shoppingInfo: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true },
            phoneNo: { type: String, required: true },
            address: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                ZipCode: { type: Number, required: true },
                Country: { type: String, required: true },

            }
        },

        status: {
            type: String,
            required: true,
            default: 'Order placed'
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: Boolean,
            required: true,
            default: false//by defalult payment should be false after making payment it should be true 
        },
        date: {
            type: Date,
            required: true,

        }
    }
)

const orderModel = mongoose.model("order", orderSchema)
export default orderModel