const User = require('../modles/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    
    const { name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ where: { email: email }});
        if(existingUser){
            // console.log('User already exists');
            return res.status(403).json({ error: "User already exists "});
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            console.log(err);
            await User.create({ name, email, password: hash })
            res.status(201).json({ message: "Successfully created new user"});
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

function generateAccessToken(id){
    return jwt.sign({ userId: id}, process.env.USER_TOKEN)
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Password is incorrect" });
        }
        
        res.status(200).json({ message: "Login successful" , token: generateAccessToken(user.id)});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

