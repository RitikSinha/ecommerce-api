const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            return res.status(400).json({ err: "product not found" });
        }
        req.product = product;
        next();
    });
}


exports.createProduct = (req, res) => {
    
    let form = formidable.IncomingForm({ keepExtensions: true });


    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: "problem with image"
            })
        }
        //restriction on fields
        const { name,
            description,
            price,
            category,
            stock
        } = fields;
        if (!name ||
            !description ||
            !price ||
            !category ||
            !stock) {
            return res.status(400).json({
                err: "please include all the field"
            })
        }
        let product = new Product(fields);
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file size to big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }
        //save to db
        product.save((errr, prod) => {
            if (errr) {
                return res.status(400).json({
                    err: "Saving tshirt in db failed"
                });
            }
            return res.json(prod);

        })
    })

}



exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);

}
//middleware for geting photo
exports.getPhoto = (req,res,id)=>{
    if(req.product.photo.data){
    res.set("Content-Type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
    }
}



exports.getAllProducts = (req, res) => {
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Found"
                })
            }
            return res.json(products);
        });
        
}
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm({ keepExtensions: true });


    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: "problem with image"
            })
        }
        //updating the product
        let product = req.product;
        product = _.extend(product,fields);
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file size to big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }
        //save to db
        product.save((errr, prod) => {
            if (errr) {
                return res.status(400).json({
                    err: "Updation of product failed "
                });
            }
            return res.json(prod);

        })
    })


}
exports.deleteProduct = (req, res) => {
Product.findByIdAndDelete(req.product._id).exec((err,prod)=>{
    if(err){
        return res.status(400).json({err:"could not delete"})
    }
    return res.json({msg:`sucessfuly deleted ${prod}`})
})
}

//middleware to update stock and orders
exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter: {_id : prod._id},
                update: {$inc:{stock: -prod.count, sold:+prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                err:"failded to update the stock"
            });
            
        }
        next();
    })
}

exports.getAllCategories=(req,res)=>{
    Product.distinct('category',{},(err,category)=>{
        if(err){
            return res.status(400).json({err:"no categories found"})
        }
        return res.json(category);
    })
}