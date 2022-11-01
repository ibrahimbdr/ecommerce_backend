const express = require('express');
const mongoose = require('mongoose');
const { makeOrder, addOrderToUser, listOrders, listOrderById } = require('../Controllers/order')
const { auth } = require('../Authentication/basicAuth');
const { userModel } = require('../Models/user');
const orderModel = require('../Models/order');
const { userRole } = require('../Authorization/userRole');

const router = express();

// router.post('/', auth, userRole, async (req, res) => {
//     try {
//         const user = await userModel.findById(req.userId);
//         console.log(user);
//         if (user != null){
//             const orderuser = user.firstName;
//             const newOrder = req.body;
//             newOrder.orderUser = orderuser;
//             console.log(orderuser);
//             const order = await makeOrder(newOrder);
//             res.json(order);
//         }else{
//             res.status(403).send("You must log in from user account");
//         }
//     }catch (err) {
//         res.status(500).send(err.message)
//     }
// })

router.post('/', auth, userRole, async (req, res) => {
    try {
        const newOrder = {products: req.body.products, orderUser: req.userId};
        const order = await makeOrder(newOrder);
        const orderUser = await addOrderToUser(req.userId, order.id);
        res.json(order);

    } catch (err) {
        res.status(500).send(err.message);
    }

})

// router.get('/', auth, async (req, res) => {
//     try {
//         const orders = await listOrders();
//         res.json(orders);
//     }catch (err) {
//         res.status(500).send(err.message)
//     }
// })

// router.get('/:id', auth, async (req, res) => {
//     try {
//         const id  = req.params.id;
//         const orders = await listOrderById(id);
//         res.json(orders);
//     }catch (err) {
//         res.status(500).send(err.message)
//     }
// })

router.get('/', auth, userRole, async (req, res) => {
    try {    
        const orders = await listOrders();
        res.json(orders);
    }catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/:id', auth, userRole, async (req, res) => {
    try {    
        const id  = req.params.id;
        const orders = await listOrderById(id);
        res.json(orders);

    }catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;