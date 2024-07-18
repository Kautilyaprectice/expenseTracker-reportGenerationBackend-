const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const userAuthentication = require('../middleware/authenticate');

router.get('/premium/leaderboard', userAuthentication.authenticate, premiumController.getUserLeaderboard);
router.get('/user/download', userAuthentication.authenticate, premiumController.downloadExpense);
router.get('/download/history', userAuthentication.authenticate, premiumController.getDownloadHistory);

module.exports = router;