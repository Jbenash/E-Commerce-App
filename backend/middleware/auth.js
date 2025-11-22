import jwt from 'jwt'

const authUser = async (req, res, next) => {

    const { token } = req.headers //equivalent to const token = req.headers.token it is called destrucuring 
    if (!token) {
        res.status(401).json({ success: false, message: 'No token provided' })
    }
    try {
        const dec_token = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = dec_token.id // token contains an id and we are storing the id to the request body  so that the controllers can make logivs with it 
        next()

    } catch (error) {
        res.status(401).json({ success: false, message: 'Error in verifying the token ' })
        console.error(error);
    }
}

export default authUser