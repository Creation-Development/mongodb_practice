const express = require('express');
const router = express.Router()
const { createUser, readUsers, deleteuser, updateuser } = require("../Controllers/UserController")


router.get('/',(req,res)=>{
    res.send("Hello World")
})

router.post('/add',createUser)
router.get('/all-user',readUsers)
router.post('/delete-user',deleteuser)
router.post('/update-user',updateuser)

module.exports = router