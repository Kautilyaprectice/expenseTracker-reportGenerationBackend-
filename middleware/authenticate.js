const jwt = require('jsonwebtoken');
const User = require('../modles/user');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: no token provided' });
        }

        const decodedToken = jwt.verify(token, '843273bf3e1d8904e2b038c99ef055e07bbc91a822d3ca2633777fe91bdc4dd1ba30ad7b01d4d92223487a198a6abf6b476131e4f126b42000705b2e0b158b847874dd476ab901ce04ebcd6f752e9dcded31d9dfeff6383142a24a62a04cdcdde14c5ea02eb4a893e1931684bb5b8a57f556807b98fb9e7ec0b31527fa569d86b40aedb03d9ddadbc4255e9d6f1f1ec19d54ae017312fccd42755cc3dae3fe784f519558400f228c9c68633514b1b5bf4df1e33be1671f1c10ac8f7b595a0a40bc9d023049d54adb11c9730bc29a5493d7ad44ce11ba7d64928836cd32805512c1a120794209d40107e4ffe72298a50f7185cf753a0297630aeb68fb588f99db');
        console.log(decodedToken.userId);

        User.findByPk(decodedToken.userId)
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed: user not found' });
                }
                req.user = user;
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Authentication failed: invalid token' });
    }
};

module.exports = { authenticate };