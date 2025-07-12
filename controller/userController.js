const User=require('../models/user');

exports.signup=async (req ,res)=>{
  const {name,email,phoneNumber,password}=req.body;
  const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully.' });
}