const orderModel = require('../Models/order');
const mongoose = require('mongoose');
const { userModel } = require('../Models/user');

function makeOrder(newOrder){
    return orderModel.create(newOrder);
}

function addOrderToUser(userId, _orderId){
    console.log(_orderId);
    // const oId = new ObjectId(_orderId);
    // orderUser.orderId.push(oId);
    return userModel.findOneAndUpdate(
        {id: userId},
        {$push: {orders: _orderId}},
        { runValidators: true }
        );
}

function listOrders(){
    // return orderModel.find()
    return  orderModel.find().populate("orderUser", "fullName");
}

function listOrderById(id){
    // return orderModel.findById(id);
    return  orderModel.findById(id).populate("orderUser", "fullName");
}

module.exports = { makeOrder, addOrderToUser, listOrders, listOrderById };