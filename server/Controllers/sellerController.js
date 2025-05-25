const Seller = require("../Modals/seller");
const Mongoose = require("mongoose");


const createSeller = async(req, res) => {
    const { _id, name, email, mobile, otherInfo } = req.body;
    console.log(req.body);

    if (!_id || !name || !email || !mobile) {
    return res
        .status(400)
        .json({ message: "Please enter all requiured fields" });
    }

    
    try {
        const newSeller = new Seller({_id, name, email, mobile, otherInfo });
        const savedSeller = await newSeller.save();
        // res.json({message: "seller created successfully", savedSeller});
        res.status(200).json({message: "seller created successfully", savedSeller});
    }
    catch (err) {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({message: "seller already exists"});
        }
        res.status(500).json({message: "error creating seller"});
    }

}

const checkSeller = async(req, res) => {
    const { _id } = req.body;
    console.log(req.body);

    try {
        console.log("here");
        const seller = await Seller.findOne({_id});
        console.log(seller);
        if(!seller){
            console.log("seller not found");
            return res.json({message: "seller does not exist", exist: false, seller: null});
        }
        console.log("seller found");
        res.status(200).json({message: "seller exists", exist: true, seller});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "error checking seller", exist: false, seller: null});
    }
}


module.exports = { createSeller, checkSeller };