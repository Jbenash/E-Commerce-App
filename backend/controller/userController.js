import userModel from "../model/userModel.js"
import validator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const login = async (req, res) => {

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

        const newUser = new userModel({
            name,
            email,
            password: hashedpassword
        })
        const user = await newUser.save()

        const token = userToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Route for admin login 
const adminLogin = async (req, res) => {

}

export { login, registerUser, adminLogin }