const express = require('express');
const router = express.Router();
const forgetPasswordController = require('../controllers/forgetPassword');

router.post('/password/forgotpassword', forgetPasswordController.forgetPassword);
router.get('/password/resetpassword/:id', forgetPasswordController.getResetPasswordForm);
router.post('/password/updatepassword/:id', forgetPasswordController.updatePassword);

module.exports = router;
 