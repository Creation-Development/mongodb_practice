const express = require('express');
const multer = require("multer")
const router = express.Router()
const { createUser, readUsers, deleteuser, updateuser } = require("../Controllers/UserController")

const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({storage:fileStorageEngine})


router.get('/', (req, res) => {
    res.send("Hello World")
})

router.post('/add',upload.single("pic"), createUser)
router.get('/all-user', readUsers)
router.post('/delete-user', deleteuser)
router.post('/update-user', updateuser)

module.exports = router