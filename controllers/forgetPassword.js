const User = require('../modles/user');
const Sib = require('sib-api-v3-sdk');
// require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const ForgetPassword = require('../modles/forgetPassword'); 
const bcrypt = require('bcrypt');

exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body; 
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({ message: 'The Email is not registered' });
    }
    console.log(email);

    var defaultClient = Sib.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
        email: 'kautilyatiwari134@gmail.com'
    };
    const receivers = [
        {
            email: email
        }
    ];

    const uid = uuidv4();
    const userId = user.id; 

    try {
        await ForgetPassword.create({
            id: uid,
            userId: userId,
            active: true,
        });

        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Password Reset Mail",
            textContent: `http://localhost:3000/password/resetpassword/${uid}`, 
        });

        console.log(response);
        res.status(201).json({ message: 'Password reset email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getResetPasswordForm = async(req, res, next) => {
    const requestId = req.params.id;
    try{
        const request = await ForgetPassword.findOne({where: {id: requestId, active: true}});
        if(!request){
            return res.status(400).json({message: 'Invalid or Expired password reset request' });
        }
        res.send(`
            <html>
                <body>
                    <form action="/password/updatepassword/${requestId}" method="POST">
                        <input type="password" name="password" placeholder="Enter new password" required />
                        <button type="submit">Reset Password</button>
                    </form>
                </body>
            </html>
        `);
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.updatePassword = async (req, res, next) => {
    const requestId = req.params.id;
    const { password } = req.body;
    try{
        const request = await ForgetPassword.findOne({where: {id: requestId, active: true}});
        if(!request){
            return res.status(400).json({ message: 'Invalid or Expired password reser request'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByPk(request.userId);
        user.password = hashedPassword;
        await user.save();

        request.active = false;
        await request.save();
        res.status(200).json({ message: 'password updated successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
};