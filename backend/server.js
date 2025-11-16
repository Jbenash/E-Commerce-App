import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import cloudinaryConfig from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'


// App configuration
const app = express()
const port = process.env.PORT || 5000
connectDB()
cloudinaryConfig()


//middleware 
app.use(express.json())
app.use(cors())


//api endpoints
app.get('/', (req, res) => {
    res.send("api is working ")
})

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.listen(port, () => {
    console.log(`server started on ${port}`)
})
