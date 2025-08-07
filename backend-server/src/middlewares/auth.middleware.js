// Middleware that is used to check validity of access token 


import ApiError from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/tokenHandler.js";
import { findUserByEmail } from "../models/users.model.js";

const verifyJWT = asyncHandler( async(req , res , next) => {

    const token = req.cookies.accessToken;

    if(!token){
        throw new ApiError(401 , "Access Token Missing")
    }

    const decodedToken = verifyAccessToken(token);

    req.user = decodedToken;     

    next()

})

export default verifyJWT