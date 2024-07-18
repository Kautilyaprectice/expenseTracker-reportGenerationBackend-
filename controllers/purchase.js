const Razorpay = require('razorpay');
const Order = require('../modles/order');

exports.purchasePremium = async (req, res, next) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: 'INR'}, (err,order) => {
            if(err){
                throw new Error(Json.stringify(err));
            }
            req.user.createOrder({ orderId: order.id, status: 'PENDING'})
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id});
                })
                .catch(err => {
                    throw new Error(err);
                });
        })
    }catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err});
    }
}; 

exports.updateTransactionStatus = async (req, res, next) => {
    try {
        const { order_id, payment_id } = req.body;
        const order = await Order.findOne({ where: { orderId: order_id } });
        if (order) {
            order.paymentId = payment_id;
            order.status = "SUCCESS";
            await order.save();
            return res.status(200).json({ success: true, message: "Transaction successful" });
        }
        res.status(404).json({ success: false, message: "Order not found" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};


exports.updatePremiumStatus = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const premiumOrder = await Order.findOne({
            where: {
                userId: userId,
                status: 'SUCCESS'
            }
        });
        if (premiumOrder) {
            return res.json({ status: 'SUCCESS' });
        } else {
            return res.json({ status: 'FAILURE' });
        }
    }catch(err){
        console.error('Error checking premium status:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
