const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
      
    image:{
        data:Buffer,
        contentType:String
    },

    seller:{
      type:String,
      ref:'seller'
    },
    approved:{
      type:Boolean,
      default:false
    },
  },
  
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;