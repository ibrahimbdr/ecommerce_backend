const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const sellerRouter = require('./Routes/seller');
const userRouter = require('./Routes/user');
const productRouter = require('./Routes/product');
const orderRouter = require('./Routes/order');

const app = express();
// mongoose.connect(`mongodb://localhost:27017/d-store`);
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.41pcn2k.mongodb.net/test`);
app.use(cors({
    origin: '*'
}));
app.use(express.json());


app.use('/seller', sellerRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

app.use("*", (req, res, next) => {
    res.status(404).send("Page is Not Found");
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is listening on port: ' + PORT));
