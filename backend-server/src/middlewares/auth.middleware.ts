// Middleware that is used to check validity of access token 


import { ApiError } from "next/dist/server/api-utils";
import asyncHandler from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/tokenHandler";
import { findUserByEmail } from "../models/users.model";

const verifyJWT = asyncHandler( async(req , res , next) => {

    const token = req.cookies.accessToken;

    if(!token){
        throw new ApiError(401 , "Access Token Missing")
    }

    const decodedToken = verifyAccessToken(token);

    req.user = decodedToken; 

    next()

})