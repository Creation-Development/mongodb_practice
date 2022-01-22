const Products = require("../Models/Products");

exports.addnewProduct = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { name, price, desc, Fname} = req.body
        const pics = req.files.pics
        const Fpic = req.files.Fpic
        var feature = []
        for (let i = 0; i < Fpic.length; i++) {
            var data = {
                name:Fname[i],
                Fpic:Fpic[i].path
            }
            feature.push(data)
        }


        console.log(feature);
        var path = []
        if (pics) {
            pics.map((file) => (path.push(file.path)))
        }
        console.log(path);
            const addPrdoct = await Products.create({
                name:name,
                price:price,
                pic:path,
                desc:desc,
                feature:feature,
            })
            addPrdoct.save()
            if (addPrdoct) res.json({ success: "Product added Successfully" })

    } catch {
        res.status(400).json({ error: "Add Product Failed..." })
    }
}


exports.allProducts = async (req, res) => {
    const products = await Products.find({}).lean()
    res.send(products)
}
exports.oneProducts = async (req, res) => {
    var id = req.params.id
    const products = await Products.find({}).lean()
    res.send(products[id])
}

