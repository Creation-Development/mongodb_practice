const express = require('express');
const multer = require('multer');


const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({storage:fileStorageEngine})

modules.expo