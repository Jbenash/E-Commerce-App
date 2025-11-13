import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'

// App configuration
const app = express()
const port = process.env.PORT || 5000
connectDB()


//middleware 
app.use(express.json())
app.use(cors())


//api endpoints
app.get('/', (req, res) => {
    res.send("api is working ")
})

app.listen(port, () => {
    console.log(`server started on ${port}`)
})
