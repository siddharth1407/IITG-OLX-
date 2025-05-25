const express = require("express");
const router = express.Router();
const { createSeller, checkSeller } = require("../Controllers/sellerController");
const { addProduct, upload } = require("../Controllers/productController");
const { getAllProducts } = require("../Controllers/imageController");



router.get("/api", (req, res) => {
    res.json({ message: "Hello from Durga server!" });
  });

router.post("/api/create/seller", createSeller);

router.post("/api/add/product", upload.single('image') ,addProduct);
router.get("/api/get/images", getAllProducts);

router.post("/api/check/seller", checkSeller);

module.exports = router;
