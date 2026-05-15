const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//register user
async function registerUser(req,res){
    const {username,email,password,role='user'} = req.body;

    //first check if user exists of same username & emial

    const isuserexists = await userModel.findOne(
        {
            $or:[
                {username},
                {email}
            ]
        }
    )
    if(isuserexists){
        return res.status(409).json(
            {
                message:"user already exists"
            }
        )
    }
    //hasing the password
    const hash = await bcrypt.hash(password,10)

    //creating a new user
    const user = await userModel.create(
        {
            username,
            email,
            password:hash,
            role
        }
    )

    //generating the token
    const token = jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET
    )
    //setting up in cookie
    res.cookie("token",token);

    //res
    res.status(201).json(
        {
            message:"User register successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        }
    )
}
//login
async function loginUser(req,res){
    const { username, email, password } = req.body;
    const user = await userModel.findOne(
        {
            $or:[
                {username},
                {email}
            ]
        }
    )
    if(!user){
        return res.status(404).json(
            {
                message:"Invalid credentials"
            }
        )
    }

    //password check
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json(
            {
                message:"Invalid credentials"
            }
        )
    }

    const token = jwt.sign(
        {
            id:user._id,
            role:user.role,
        },process.env.JWT_SECRET
    )

    res.cookie("token",token)

    res.status(200).json(
        {
            message:"User logged in successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        }
    )
}

//logout
async function logOutUser(req,res){
    res.clearCookie('token');
    res.status(200).json(
        {
            message:"User logged out successfully"
        }
    )
}


module.exports = {registerUser,loginUser,logOutUser};