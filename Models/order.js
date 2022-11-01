const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const orderSchema = mongoose.Schema({
    products: { type: 'array', required: true, trim: true},
    // orderUser: { type: 'string'}
    orderUser: {type: mongoose.Schema.ObjectId, ref: 'User'}
    // creationalDate: { type: 'Date', timestamps: true, default: new Date() }
})

orderSchema.plugin(timestamps);

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;