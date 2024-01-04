const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://bhoomikabhat6045:bhoomikamongo@rooms.i68qlm7.mongodb.net/roomusers?retryWrites=true&w=majority")
.then((response)=>{console.log("database is connected")})
.catch((error)=>{
  // console.log(error);
  console.log("database not connected")});
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
