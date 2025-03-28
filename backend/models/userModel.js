const mongoose = require('mongoose');
const bcrypt  = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  image: {
    type: String,
  },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
})

const User = mongoose.model('social-login', userSchema);

module.exports = User;