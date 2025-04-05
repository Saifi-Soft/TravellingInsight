const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ created_at: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add subscriber
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    const newSubscriber = new Subscriber({ email });
    const subscriber = await newSubscriber.save();
    
    res.status(201).json(subscriber);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete subscriber
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
