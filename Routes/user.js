const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, getUserById } = require('../Controllers/user');
const { auth } = require('../Authentication/basicAuth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel } = require('../Models/user');
const { userRole } = require('../Authorization/userRole');

const router = express();


router.post('/', async(req, res, next) => {
    try{
        const newUser = await createUser(req.body);
        console.log(newUser)
        res.json(newUser);
    }catch(error){
        res.status(401).send(error);
    }
})

router.post('/login', async(req, res) => {
    try{
        const { username, password } = req.body;
        const user = await userModel.findOne({username: username});
        console.log(user);
        console.log(password);
        if(user){
            const passwordValidate = await bcrypt.compare(req.body.password, user.password);
            console.log(passwordValidate);
            if(passwordValidate){
                const token = jwt.sign({
                    data: {username: user.username, userId: user.id}
                }, process.env.SECRET_KEY)
                res.send(token);
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

router.patch('/', auth, userRole, async (req, res) => {
    try {
        const userId = req.userId;
        const userToUpdate = req.body;
        const updatedUser = await updateUser(userId, userToUpdate);
        res.json(updatedUser);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/', auth, userRole, async (req, res) => {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const userToDelete = req.body;
        const deletedUser = await deleteUser(userId, userToDelete);
        res.json(deletedUser);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', auth, userRole, async(req, res, next) => {
    try{
        const userId = req.userId;
        const user = await getUsers(userId);
        res.json(user);
    }catch(error){
        res.status(500).send(error.message);
    }
})

// router.get('/:id', auth, async(req, res, next) => {
//     try{
//         const userId = req.userId;
//         const id  = req.params.id;
//         const user = await getUserById(userId, id);
//         res.json(user);
//     }catch(error){
//         res.status(500).send(error.message);
//     }
// })

module.exports = router;