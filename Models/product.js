const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp'); 

const productSchema = mongoose.Schema({
    // name: {type: 'string', required: true },
    // // sellerName: {type: 'string'}
    // seller: {type: mongoose.Schema.ObjectId, ref: "Seller"}
    title: {type: 'string', required: true},
    price: {type: 'number', required: true},
    quantity: {type: 'number', required: true},
    description: {type: 'string'},
    category: {type: 'string', required: true},
    image: {type: 'string', default: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'},
    rating: {
        rate: {type: 'number', default: 0},
        count: {type: 'number', default: 0}
    },
    seller: {type: mongoose.Schema.ObjectId, ref: "Seller"}
})

productSchema.plugin(timestamps);

const productModel = mongoose.model('Product', productSchema);

module.exports = { productModel };