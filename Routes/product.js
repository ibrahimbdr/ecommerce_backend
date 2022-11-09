const express = require('express');
const { registerProduct, updateProduct, deleteProduct, getProduct, getSellerByName } = require('../Controllers/product');
const { auth } = require('../Authentication/basicAuth');
const router = express();
const { sellerModel } = require('../Models/seller');
const { sellerRole } = require('../Authorization/sellerRole');

// router.post('/', auth, async (req, res) => {
//     try {
//         const seller = await sellerModel.findById(req.userId);
//         console.log(seller);
//         if (seller != null) {
//             const sellername = seller.name
//             const newProduct = req.body;
//             newProduct.sellerName = sellername;
//             console.log(sellername);
//             const registeredProduct = await registerProduct(newProduct);
//             res.json(registeredProduct);
//         }else{
//             res.status(403).send("you must log in from a seller account");
//         }

//     } catch (err) {
//         res.status(500).send(err.message);
//     }

// })

router.post('/', auth, sellerRole, async (req, res) => {
    try {
        const newProduct = {title: req.body.title, price: req.body.price,
             quantity:req.body.quantity, description:req.body.description,
              category: req.body.category, image: req.body.image,
               rating:{rate:req.body.rating.rate, count: req.body.rating.count},
                seller: req.userId};
                console.log("passed 1");
        const registeredProduct = await registerProduct(newProduct);
        console.log("passed 3");
        res.json(registeredProduct);

    } catch (err) {
        res.status(500).send(err.message);
    }

})


router.patch('/:id', auth, sellerRole, async (req, res) => {
    try {
        const productToUpdate = req.body;
        const id  = req.params.id;
        const updatedproduct = await updateProduct(id, productToUpdate);
        res.json(updatedproduct);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/:id', auth, sellerRole, async (req, res) => {
    try {
        const id  = req.params.id;
        const deletedproduct = await deleteProduct(id);
        res.json(deletedproduct);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const Product = await getProduct();
//         res.json(Product);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }

// })

router.get('/', auth, async (req, res) => {
    try {
        const seller = await sellerModel.findById(req.userId);
        console.log(seller);
        if (seller != null) {
            let SellerId = req.userId;
            const Product = await getProduct(SellerId);
            res.json(Product);
        }else {
            const sellerName = req.query.name;
            console.log(sellerName);
            let seller;
            let SellerId;
            if(sellerName!=null){
                seller = await getSellerByName(sellerName);
                SellerId = seller.id;
            }
            const Product = await getProduct(SellerId);
            res.json(Product);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

})





router.get('/:id', auth, async (req, res) => {
    try {
        const id  = req.params.id;
        const Product = await getProductById(id);
        res.json(Product);
    } catch (err) {
        res.status(500).send(err.message);
    }

})



module.exports = router;

