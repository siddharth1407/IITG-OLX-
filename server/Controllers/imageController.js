const Mongoose = require("mongoose");
const Product = require("../Modals/Product");

// function for fetching all products
const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find();
        
        if(products.length === 0){
            res.json({message:"No products found", products:[]});
        }
        

        res.json({ message: "Products fetched successfully", products});
        
        
        // res.json({ message: "Products fetched successfully", products });
        
    }
    catch (err) {
        console.log(err);
        res.json({ message: err, products: [] });
    }



}

module.exports = { getAllProducts };
