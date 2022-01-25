const Users = require("../models/Users");
const cloudinary = require('cloudinary');



cloudinary.config({
    cloud_name: 'webbrains',
    api_key: '873397293722448',
    api_secret: 'Kp_72tZOMKa3j_Y_ZzFQh-oZ2sA'
});

exports.createUser = async (req, res) => {
    const { name, email, phone, pass, conpass } = req.body
    var pic = req.files.pic
    console.log(pic);
    var path = []
    if (pic.name) {
        var img = pic.tempFilePath
        var data = await uploadToCloudinary(img, path)
        console.log(data);
        var createUser = await Users.create({
            fullname: name,
            email: email,
            phone: phone,
            pic: data,
            pass: pass,
            conpass: conpass,
        })
    }
    else {
        for (let i = 0; i < pic.length; i++) {
            var img = pic[i].tempFilePath
            var data = await uploadToCloudinary(img, path)
            console.log(data);
            if (path.length === pic.length) {
                var createUser = await Users.create({
                    fullname: name,
                    email: email,
                    phone: phone,
                    pic: data,
                    pass: pass,
                    conpass: conpass,
                })
            }
        }
    }
    createUser.save()
    if (createUser) res.json({ success: "User added Successfully" })
}


function uploadToCloudinary(locaFilePath, path) {
    return cloudinary.uploader
        .upload(locaFilePath, {
            folder: "/public",
            public_id: `${Date.now()}`
        })
        .then((value) => {
            path.push({
                url: value.url,
                public_id: value.public_id
            })
            return path
        })
}



exports.deleteImage = async (req, res) => {
    const id = req.params.id
    const imgid = req.params.imgid

    const users = await Users.findOne({ _id: id }).lean()
    var path = users.pic.splice(imgid, 1)
    console.log(users);
    await Users.findOneAndReplace({ _id: id }, users)
}




exports.readUsers = async (req, res) => {
    const users = await Users.find({}).lean()
    res.send(users)
}

exports.deleteuser = async (req, res) => {

    try {
        console.log(req.body);
        const { email } = req.body
        const User = await Users.findOne({ email: email });
        console.log(User.pic)
        for (let i = 0; i < User.pic.length; i++) {
            var id = User.pic[i].public_id
            await remove(id)
        }
        await Users.findOneAndDelete({ email })
        console.log("1 document deleted");
    }
    catch (err) {
        console.log(err);
    }
}

const remove = (id) => {
    let image_id = id;
    console.log(image_id);
    cloudinary.uploader.destroy(image_id, (err, result) => {
        console.log("Deleted");
    });
};

exports.updateuser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, phone, pass, conpass } = req.body
        var pic = req.files.pic
        console.log(req.body);
        console.log(req.files);
        var path = []
        if (!pic) {
            path = await Users.findOne({ _id: id }).lean().pic
        }
        else {
            if (pic.name) {
                var img = pic.tempFilePath
                var data = await uploadToCloudinary(img, path)
                console.log(data);
                var createUser = {
                    fullname: name,
                    email: email,
                    phone: phone,
                    pic: data,
                    pass: pass,
                    conpass: conpass,
                }
            }
            else{
                for (let i = 0; i < pic.length; i++) {
                    var img = pic[i].tempFilePath
                    var data = await uploadToCloudinary(img, path)
                    console.log(data);
                    if (path.length === pic.length) {
                        var createUser = {
                            fullname: name,
                            email: email,
                            phone: phone,
                            pic: data,
                            pass: pass,
                            conpass: conpass,
                        }
                    }
                }
            }
        }
        await Users.findOneAndReplace({ _id: id }, createUser);
        console.log("1 document updated");
    }
    catch (err) {
        console.log(err);
    }
}
