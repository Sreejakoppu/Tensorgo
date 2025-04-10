const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const User = require("../models/userModel");

/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    console.log("userRes", userRes.data.email);
    console.log(email, name, picture);
    let user = await User.findOne({ email });

    if (!user) {
      console.log("int if :: user not found");
      user = await User.create({
        name,
        email,
        image: picture,
      });

      console.log("user created");
    }

    const { _id } = user;
    console.log("_id :: ", _id);
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.status(200).json({
      message: "success",
      token,
      user,
      login: true,
    });
  } catch (err) {
    console.error("Google Auth Error:", err); 
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// const userAuth = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   try {
//     if (!email || !password){
//       return res.status(400).send({ message: "Please fill all the fields" });
//     }
//     const user = await User.findOne({email});

//     if(user){
//         const verify = await bcrypt.compare(password,user.password);
//         if(verify){
//             const id = user._id;
//             const email = user.email;
//             const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
//               expiresIn: process.env.JWT_TIMEOUT,
//             });
//             return res.status(200).json({
//                 message:"success",
//                 email:user.email,
//                 token,
//                 login:true
//             })
//         }else{
//             return res.status(400).json({
//                 message:"Password is incorrect"
//             })
//         }
//     }else{
//         return res.status(400).json({message:"User not found"});
//     }
//   } catch (error) {
//     return res.status(500).json({
//         message:"Internal server error"
//     })
//   }
// };
const userAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        login: false,
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        login: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password is incorrect",
        login: false,
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT,
      }
    );

    // Successful login
    return res.status(200).json({
      message: "success",
      email: user.email,
      token,
      login: true,
    });
  } catch (error) {
    console.error("Login error:", error); // Log for debugging
    return res.status(500).json({
      message: "Internal server error",
      login: false,
    });
  }
};

module.exports = {
  googleAuth,
  userAuth,
};
