

const fs = require('fs');
const path = require('path');
const multer = require('multer');
// const { create } = require('../Modals/Seller');
const  Product  = require('../Modals/Product');

// storing image in mongoDB using multer



const pathName = path.join(__dirname, '../public/uploads'); 



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, pathName);
    }
    ,
    filename:(req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}
)

const upload = multer({storage:storage});


const addProduct = async (req, res)=>{
    const {name, category, price, description,seller} = req.body;
    
    if(req.file == undefined){
        res.json({message:"Something went wrong"});
    }
    const image= {
            data: fs.readFileSync(path.join(pathName, req.file.filename)),
            contentType: req.file.mimetype

        }
    // let path = path.join(pathName, req.file.filename);
    fs.unlinkSync(path.join(pathName, req.file.filename),(err)=>{
        if(err) { console.log(err) }
        else { console.log('file deleted') }
    });
    
    // console.log(product);
    try{
        const product = new Product({name, category, price, description,image,seller});
        const savedProduct = await product.save();
        res.json({message:"Product added successfully"});
    }
    catch(err){
        console.log(err);
        res.json({message:err});
    }

    // createProduct(obj, (err, data)=>{
    //     if(err){
    //         res.json({message:err});
    //     }
    //     else{
    //         res.json({message:data});
    //     }
    // }
    // )



    


    // console.log(name, category, price, description);
    // // console.log(req.body);
    // // console.log(req.file);
    // console.log("request recieved");
    // res.json({message: "product added successfully", product});
}

module.exports = { addProduct, upload };

//