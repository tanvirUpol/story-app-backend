import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const protect = asyncHandler(async (req,res,next) => {
    // let token;

    // token = req.cookies.jwt
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authentication token required'})
    }

    const token = authorization.split(' ')[1]

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)  
            req.user = await User.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized. invalid token')
        }
    }else {
        res.status(401);
        throw new Error('Not authorized. no token provided')
    }
})

export {protect}