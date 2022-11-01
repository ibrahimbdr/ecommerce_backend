const { sellerModel } = require('../Models/seller');

function createSeller(newSeller) {
    return sellerModel.create(newSeller);
}

function getSellers(){
    return sellerModel.find().populate("products");;
}

function updateSeller(id, product) {
    return sellerModel.update(id, product);
}

function deleteSeller(id, product) {
    return sellerModel.remove(id, product);
}

function getSellerById(id){
    return sellerModel.findById(id).populate("products");
}

module.exports = { createSeller, getSellers, updateSeller, deleteSeller, getSellerById };