const { sellerModel } = require('../Models/seller') 

async function sellerRole(req, res, next) {
    const seller = await sellerModel.findById(req.userId);
    console.log(seller);
    if (seller != null) {
        next();
    }else{
        res.status(403).send("Not Auhtorized user");
    }   
}

module.exports = { sellerRole };