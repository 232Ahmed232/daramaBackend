import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async(userId) => {
    try {
      const user =  await User.findById(userId)
      const accessToken =  user.generateAccessToken()    
      const refreshToken = user.generateRefreshToken() 
      
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating Tokens");
        
    }
}


const registerUser = asyncHandeler(async(req,res)=>{

    const {fullName, email,username,password} = req.body
    // console.log("Email: ",email);
    
    if (
        [fullName,email,username,password].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

   const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409,"User with email or username exist")
    }

    // console.log(req.files);
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    
    
    

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar files required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar files required in cloudinary")
    }

   const user =  await User.create({
        fullName,
        avatar:avatar?.url || "",
        
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if (!createdUser) {
        throw new ApiError(500,"Something went wrong rigester a user")
    }

   return  res.status(201).json(
    new ApiResponse(200,createdUser,"User register Successfully")
   )
})


const loginUser = asyncHandeler(async(req,res)=>{


    const {email,username,password} = req.body
    

    if (!username &&  !email) {
        throw  new ApiError(400,"username or email is required")
    }

   const user =  await User.findOne({
        $or: [{username},{email}]
    })

    if (!user) {
        throw new ApiError(404,"User does not existed")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401,"Password is in correct")
    }

    const {accessToken,refreshToken} =  await generateAccessAndRefreshTokens(user._id)

    const LoggedInUser =  await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:LoggedInUser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )
})  


const logOut = asyncHandeler(async(req,res)=>{

   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
     .json(
        new ApiResponse(
            200,
            {
                
            },
            "User logged out in Successfully"
        )
    )


})



const refreshTokenAccess = asyncHandeler(async(req,res)=>{
   try {
    const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken
 
    if (!incomingRefreshToken) {
         throw new ApiError(401,"Unauthorized request")
    }
 
    const decodedToken = jwt.verify(
     incomingRefreshToken,
     process.env.REFRESH_TOKEN_SECRET
    )
 
   const user =  await User.findById(decodedToken._id)
 
   if (!user) {
         throw new ApiError(401,"Invalid token")
   }
 
   if (incomingRefreshToken !== user?.refreshToken ) {
     throw new ApiError(401,"Refresh token is expired or used")
   }
 
   const options = {
         httpOnly:true,
         secure:true
     }
     
     const {accessToken,NewrefreshToken} =  await generateAccessAndRefreshTokens(user._id)
 
     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",NewrefreshToken,options)
     .json(
         new ApiResponse(
             200,
             {
                 user:accessToken,refreshToken: NewrefreshToken
             },
             "Access tToken refresh"
         )
     )
   } catch (error) {
        throw new ApiError(400,"Invalid Token");
        
   }

})


const changeCurrentPassword = asyncHandeler(async(req,res)=>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect  = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(404,"In correvt password")
    }

    user.password = newPassword

     await user.save({validateBeforeSave:false})

     return res.status(200)
     .json(new ApiResponse(200,{},"PASSWORD CHANGE SUCCESSFULLY"))
    
})


const getCurrentUser = asyncHandeler(async(req,res)=>{

    // const user = await User.findById(req.user?._id)

    // if (!user) {
    //     throw new ApiError(404,"No User found")
    // }

    return res.status(200)
    .json(
        new ApiResponse(200,req.user,"User is found")
    )
    
})


const updateUserDetails = asyncHandeler(async(req,res)=>{
    const {fullName,email} =req.body

    if (!fullName && !email) {
        throw new ApiError(400, "All fields are equired")
    }

    User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new:true}
    ).select("-password")

    return res.status(200)
    .json(200, user , "Current user successFully")
})

const avatarUserupdate = asyncHandeler(async(req,res)=>{

    const avatarLocalPath = req.file?.path

    if (avatarLocalPath) {
        throw new ApiError(400,"Avatar file is mising")
    }

    const avatar =  uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400,"Avatar file is mising")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new:true}
    ).select("-password")

     return res.status(200)
     .json(
        200,
        new ApiResponse(200, user,"Avatar file is updated")
     )      

})




export {
    registerUser,
    loginUser,
    logOut,
    refreshTokenAccess,
    changeCurrentPassword,
    getCurrentUser,
    updateUserDetails
}