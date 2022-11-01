const { userModel } = require('../Models/user');

function createUser(newUser) {
    console.log(newUser);
    return userModel.create(newUser);
}

function getUsers(_id){
    return userModel.find({id: _id}).populate("orders","products createdAt");
}

function updateUser(id, product) {
    return userModel.update(id, product);
}

function deleteUser(id, product) {
    return userModel.remove(id, product);
}

function getUserById(id){
    return userModel.findById(id).populate("orders","products createdAt");
}

module.exports = { createUser, getUsers, updateUser, deleteUser, getUserById };