require('dotenv').config();
const jwt=require('jsonwebtoken');

const authenticate=async (req,res,next)=>{
  try {
    const token=req.header('Authorization');

    if(!token){
      return res.status(401).json({message:'Token not provided'});
    }
    const user=jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
  } catch (error) {
    console.error(err);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports=authenticate;