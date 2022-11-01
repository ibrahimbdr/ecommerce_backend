// const { json } = require('express');
const { productModel } = require('../Models/product');
const { sellerModel } = require('../Models/seller');



function registerProduct(product) {
    console.log("passed 2");
    return productModel.create(product);
}


function updateProduct(id, product){
    return productModel.update({_id: id}, product, {runValidators: true});
}


function deleteProduct(id){
    return productModel.findByIdAndRemove(id);
}


// function getProduct() {
//     return productModel.find().populate("seller", "name");
// }


function getProduct(SellerId) {
    
    if(SellerId!=null){
        return  productModel.find({seller: SellerId}).populate("seller", "name");
    }else{
        return  productModel.find().populate("seller", "name");
    }
}

// function getProduct(SellerId) {
    
//         return  productModel.find();

// }

function getSellerByName(sellerName){
    return sellerModel.findOne({name: sellerName});
}

module.exports = { registerProduct, updateProduct, deleteProduct, getProduct, getSellerByName };