require('dotenv').config();
const jwt=require('jsonwebtoken');
const bycrpt=require('bcrypt');
const User=require('../models/user');

const generateAccessToken=(id,name)=>{
  return jwt.sign({userId:id,name:name},process.env.JWT_SECRET,{ expiresIn: '12h' });
}
exports.signup=async (req ,res)=>{
  try{
  const {name,email,phoneNumber,password}=req.body;
  if(!name || !email || !phoneNumber || !password){
    return res.status(400).json({message:'All fields are required'});
  }

  const existingUser=await User.findOne({where:{email}});
  
  if(existingUser){
    return res.status(409).json({message:'User already exists'});
  }
  const saltRounds=10;
  const hasedPassword=await bycrpt.hash(password,saltRounds);
  const newUser=await User.create({
    name,
    email,
    phoneNumber,
    password:hasedPassword
  });
 
  res.status(201).json({ message: 'User created successfully.' });
}catch(error){
  console.log(error);
  res.status(500).json({ message: 'Internal Server Error',error: error.message });
}
}

exports.login=async (req,res)=>{
  try {
    const {email,password}=req.body;
    if (!email || !password) {
       return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user=await User.findOne({where:{email}});
    if(!user){
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }
    const passwordMatch=await bycrpt.compare(password,user.password);
    if(!passwordMatch){
      return res.status(401).json({ message: 'User not authorized' });
    }
    const token=generateAccessToken(user.id,user.name);
    res.status(200).json({message: 'Login successful.',token: token});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
}