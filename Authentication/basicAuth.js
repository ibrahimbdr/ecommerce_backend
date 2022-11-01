const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const { authentication } = req.headers;
    console.log(authentication);
    
    jwt.verify(authentication, process.env.SECRET_KEY, function (error, decoded) {
        if(decoded){
            req.userId = decoded.data.userId;
            console.log(decoded.data);
        }
        if(error){
            res.status(401).send('You must Log in first !!!');
        }
        next();
    })
}

module.exports = { auth };