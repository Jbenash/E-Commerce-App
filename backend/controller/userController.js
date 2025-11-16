import userModel from "../model/userModel.js"
import validator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bycrypt.compare(password, user.password)

        if (isMatch) {
            const token = userToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

//Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //checking user already exist or not 
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })

        }

        //validating the email format and strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email is not valid" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Not a strong Password" })
        }

        //hashing user password
        const salt = await bycrypt.genSalt(10)
        const hashedpassword = await bycrypt.hash(password, salt)

        const user = await new userModel({
            name,
            email,
            password: hashedpassword
        }).save() //.save() actually writes that document to MongoDB and returns the saved document (with _id, timestamps, etc.).

        const token = userToken(user._id)

        res.status(200).json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.status(404).json({ success: false, message: error.message })
    }
}

//Route for admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, message: "succesfull login ", token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })

        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ success: false, message: error.message })

    }
}

export { login, registerUser, adminLogin }