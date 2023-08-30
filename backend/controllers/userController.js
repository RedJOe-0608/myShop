import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//@desc auth user & get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async(req,res) => {
    // console.log(req.body);
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user && (await user.matchPassword(password))) {
        generateToken(res,user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

//@desc Register User
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async(req,res) => {
   const {name,email,password} = req.body

   const userExists = await User.findOne({email})

   //this means that the user already exists, and that you are trying to register with the same credentials
   if(userExists){
    res.status(400)
    throw new Error("User already exists")
   }

   const user = await User.create({name, email,password})

   if(user){
    generateToken(res,user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
   }else{
    res.status(400)
    throw new Error("Invalid User Data")
   }
});

//@desc Logout User & clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires:  new Date(0),
    })

    res.status(200).json({message: 'User logged out successfully!'})
 });

//@desc get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id)
    console.log(user._id);
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
 });

//@desc update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        //if we are updating the password as well
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found!')
    }
 });

//@desc get users
//@route GET /api/users
//@access private/Admin
const getUsers = asyncHandler(async(req,res) => {
    res.send("get users")
 });


//@desc delete users
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async(req,res) => {
    res.send("delete users")
 });

//@desc get user by ID
//@route GET /api/users/:id
//@access private/Admin
const getUserById = asyncHandler(async(req,res) => {
    res.send("get user by id")
 });

//@desc update users
//@route PUT /api/users/:id
//@access private/Admin
const updateUser = asyncHandler(async(req,res) => {
    res.send("update users")
 });

 export {authUser, registerUser, logoutUser,getUserProfile, updateUserProfile,getUsers,deleteUser,getUserById,updateUser}
 

