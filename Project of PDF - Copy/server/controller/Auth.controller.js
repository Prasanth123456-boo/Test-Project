import User from "../models/Auth.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
      const {
        name,
        email,
        pass 
        
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(pass, salt);
  
      const newuser = new User({
        name,
        email,
        pass: passwordHash
        
      });
  
      const saveduser = await newuser.save();
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
      res.status(201).json(saveduser);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const login = async (req, res ,next) => {   
    try {
      const envToken = process.env.JWT_SECRET;
      const {email,pass} = req.body
    //   const data = await User.find({email:email});
     User.findOne({email: email }).then((response) => {
        if (!response) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
   
        const passmatch = bcrypt.compareSync(pass, response.pass);
        if (passmatch) {
          const token = jwt.sign(
            { id: response._id, pass: response.pass},
            envToken,
            { expiresIn: 60 * 120 }
          );
          const refreshToken = jwt.sign(
            {  id: response._id, pass: response.pass, },
            envToken,
            { expiresIn: '1d' }
          );
          res.status(200).json({
            name: response.name,
            refreshToken: refreshToken,
            accessToken: token,
            email:response.email,
            message: 'login Successful',
           
          });
        } 
        else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
     }
  };

