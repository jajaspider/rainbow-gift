const express = require('express');

const gifticonRouter = require('./gifticon');
const categoryRouter = require('./category');

const router = express.Router();

router.use('/gifticon', gifticonRouter);
router.use('/category', categoryRouter);

module.exports = router;