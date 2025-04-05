const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const upload = require('../middleware/upload');

// Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create author
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const newAuthor = new Author({
      name,
      bio,
      avatar: req.file ? `/uploads/${req.file.filename}` : req.body.avatar
    });
    
    const author = await newAuthor.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update author
router.put('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    const updateData = {
      name: name || author.name,
      bio: bio || author.bio,
      avatar: req.file ? `/uploads/${req.file.filename}` : req.body.avatar || author.avatar
    };
    
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(updatedAuthor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete author
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    
    await Author.findByIdAndDelete(req.params.id);
    res.json({ message: 'Author removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
