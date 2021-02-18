const Category = require('../models/category');

//create
exports.createCategory = (req,res)=>{
    let category = new Category(req.body);
        category.save((err,cate)=>{
            if(err){
               return  res.status(400).json({err:"failed to save category"})
            }
            return res.json({msg:`new category added ${cate}`})
        })
}
//middleware
exports.getCategoryByID = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"category not found!"})
        }
        req.category = cate;
        next();
    })
}
//read
exports.getCategories = (req,res)=>{
    Category.find({}).exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"no category found"});
        }
        return res.json(cate);
    })
}

exports.getCategory = (req,res)=>{
    return res.json(req.category);
}

//update
exports.updateCategory = (req,res)=>{
    Category.findByIdAndUpdate(
        {_id:req.category._id},
        {$set: req.body },
        {new: true, useFindAndModify:false},
        ).exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"could not update category"});
        }
        return res.json(cate);
        
    })
}
//delete
exports.deleteCategory = (req,res)=>{
    Category.findOneAndDelete(
        {_id:_req.category._id}
    ).exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"cannot delete category!"})
        }
        return res.json({msg:"sucessfuly deleted!"});
    })
}
