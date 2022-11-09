const express = require('express');
const { createSeller, getSellers, updateSeller, deleteSeller, getSellerById } = require('../Controllers/seller');
const { auth } = require('../Authentication/basicAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sellerModel } = require('../Models/seller');
const { sellerRole } = require('../Authorization/sellerRole');

const router = express();


router.post('/', async(req, res, next) => {
    try{
        const newSeller = await createSeller(req.body);
        console.log(newSeller)
        res.json(newSeller);
    }catch(error){
        res.status(401).send(error);
    }
})

router.post('/login', async(req, res) => {
    try{
        const { username, password } = req.body;
        const user = await sellerModel.findOne({username: username});
        console.log(user);
        console.log(password);
        if(user){
            const passwordValidate = await bcrypt.compare(req.body.password, user.password);
            console.log(passwordValidate);
            if(passwordValidate){
                const token = jwt.sign({
                    data: {username: user.username, userId: user.id}
                }, process.env.SECRET_KEY)
                res.json(token);
            }else{
                res.status(403).send("Invalid Authentication");
            }
        }else{
            res.status(403).send("Invalid Authentication");
        }
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.patch('/', auth, sellerRole, async (req, res) => {
    try {
        const userId = req.userId;
        const sellerToUpdate = req.body;
        const updatedSeller = await updateSeller(userId, sellerToUpdate);
        res.json(updatedSeller);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/', auth, sellerRole, async (req, res) => {
    try {
        const userId = req.userId;
        const sellerToDelete = req.body;
        const deletedSeller = await deleteSeller(userId, sellerToDelete);
        res.json(deletedSeller);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', auth, sellerRole, async(req, res, next) => {
    try{
        const userId = req.userId;
        const Seller = await getSellerById(userId);
        res.json(Seller);
    }catch(error){
        res.status(500).send(error.message);
    }
})

// router.get('/:id', auth, async(req, res, next) => {
//     try{
//         const id  = req.params.id;
//         const Seller = await getSellerById(id);
//         res.json(Seller);
//     }catch(error){
//         res.status(500).send(error.message);
//     }
// })

module.exports = router;
