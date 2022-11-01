const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = mongoose.Schema({
    username: { type: 'string', required: true, unique: true, minLength: 8 },
    password: { type: 'string', required: true },
    name: { type: 'string', required: true, unique: true, minLength: 4 },
    // products: { type: 'array', required: true, trim: true}
    products: [{ type: 'ObjectId', required: true, trim: true}]
})

sellerSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
})

const sellerModel = mongoose.model('Seller', sellerSchema);

module.exports = { sellerModel };