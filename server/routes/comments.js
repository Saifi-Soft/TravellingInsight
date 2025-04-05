const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('post_id', 'title slug')
      .sort({ created_at: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get comments by post ID
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ 
      post_id: req.params.postId,
      approved: true 
    }).sort({ created_at: -1 });
    
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create comment
router.post('/', async (req, res) => {
  try {
    const { post_id, name, email, content } = req.body;
    
    const newComment = new Comment({
      post_id,
      name,
      email,
      content,
      approved: false
    });
    
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve comment
router.put('/approve/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
