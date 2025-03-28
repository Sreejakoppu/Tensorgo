// // const isAuthenticated = (req, res, next) => {
// //   if (req.isAuthenticated()) {
// //     return next();
// //   }
// //   res.status(401).send("Unauthorized"); // Or redirect to login page
// // };

// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const { oauth2Client } = require("../utils/googleClient");
// const User = require("../models/userModel");

// const googleAuth = async (req, res, next) => {
//   const code = req.query.code;
//   try {
//     const googleRes = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(googleRes.tokens);
//     const userRes = await axios.get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//     );
//     const { email, name, picture } = userRes.data;
//     console.log("userRes", userRes);
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         image: picture,
//       });
//     }
//     const { _id } = user;
//     req.User=_id;
//     next();
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

// module.exports = googleAuth;
