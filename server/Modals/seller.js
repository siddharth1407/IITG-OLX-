const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {

    // using own _id in place of mongoose's _id
    _id: {
      type: String,
      required: true,
      primaryKey: true
    },

    name: {
      type: String,
      required: true,
    },
 
    email: {
      type: String,
      required: true,
    },

    mobile: {
      type: Number,
      required: true,
    },

    otherInfo: {
      type: String,
      required: true,
    },

    date: { 
      type: Date, 
      default: Date.now 
    },

  }

);
const Seller = mongoose.model("seller", sellerSchema);
module.exports = Seller;

