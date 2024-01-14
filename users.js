const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
// const userModel = require("./Hotel");

mongoose
  .connect("mongodb://127.0.0.1:27017/newsomething")
  .then((response) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
    console.log("Not connected to the database");
  });

const HotelModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);

HotelModel.plugin(plm);

module.exports = mongoose.model("trial2", HotelModel);
