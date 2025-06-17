const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    const orderDate = req.body.order_date;
    const userEmail = req.body.email;
    await data.splice(0, 0, { Order_date: orderDate });
    try {
        let eId = await Order.findOne({ 'email': userEmail });
        if (eId === null) {
            await Order.create({
                email: userEmail,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: userEmail },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.json({ orderData: null });
        }
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});
module.exports = router;