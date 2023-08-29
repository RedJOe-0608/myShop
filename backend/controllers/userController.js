import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//@desc auth user & get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async(req,res) => {
   res.send("Auth user")
});

//@desc Register User
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async(req,res) => {
   res.send("Register user")
});

//@desc Logout User & clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async(req,res) => {
    res.send("Logout user")
 });
 

