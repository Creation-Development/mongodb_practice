const express = require('express');
const multer = require('multer');
const router = express.Router()
const { addnewProduct, allProducts, oneProducts } = require('../Controllers/productController');

const fileStorageEngine = multer.diskStorage({


    destination: function (req, file, cb) {
        console.log(file.fieldname);
        if (file.fieldname == "Fpic") {
            cb(null, "./public/features");
        }
        else{
            cb(null, "./public/products");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: fileStorageEngine })


router.get("/", (req, res) => {
    res.send("Hello World")
})
router.post("/add",upload.fields(
    [
        {
            name: 'Fpic',
        },
        {
            name:"pics",
        }
        
    ]
    ), addnewProduct)

router.get("/all", allProducts)
router.get("/:id", oneProducts)



module.exports = router
