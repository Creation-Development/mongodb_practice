const Users = require("../models/Users");
const fs = require("fs");



exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, pass, conpass } = req.body
        const pic = req.file
        // console.log(pic);
        var path = ""
        if (pic.path) {
            path = pic.path
        }
        console.log(path);

        const emailVerify = await Users.findOne({ email: email }).lean()

        if (emailVerify) res.json({ error: "Email already Exists." })

        if (!emailVerify) {
            const createUser = await Users.create({
                fullname: name,
                email: email,
                phone: phone,
                pic: path,
                pass: pass,
                conpass: conpass,
            })
            createUser.save()
            if (createUser) res.json({ success: "User added Successfully" })
        }

    } catch {
        res.status(400).json({ error: "Create User Failed..." })
    }
}

exports.readUsers = async (req, res) => {
    const users = await Users.find({}).lean()
    res.send(users)
}

exports.deleteuser = async (req, res) => {

    try {
        console.log(req.body);
        const { email } = req.body
        const User = await Users.findOne({ email });
        console.log(User.pic)
        fs.unlink(User.pic, (err) => {
            if (err) throw err;
        });
        await Users.findOneAndDelete({ email })
        console.log("1 document deleted");
    }
    catch (err) {
        console.log(err);
    }
}

exports.updateuser = async (req, res) => {
    try {
        console.log(req.body);
        const [{ id }] = req.body
        const [, newVal] = req.body
        await Users.findOneAndReplace({ _id: id }, newVal);
        console.log("1 document updated");
    }
    catch (err) {
        console.log(err);
    }
}
