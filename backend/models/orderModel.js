// Order model (dummy)
// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);

// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place new order
router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    const newOrder = new Order({ items });
    const saved = await newOrder.save();
    res.status(201).json({ orderId: saved._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
});

// Pay for an order
router.post("/pay/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Paid";
    await order.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
});

// Get order status
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ status: order.status });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

module.exports = router;