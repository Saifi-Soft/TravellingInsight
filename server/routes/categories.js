const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Post = require('../models/Post');
const upload = require('../middleware/upload');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    // Get post count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Post.countDocuments({ categories: category._id });
        return {
          ...category.toObject(),
          count
        };
      })
    );
    
    res.json(categoriesWithCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    
    const newCategory = new Category({
      name,
      slug,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    });
    
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const updateData = {
      name: name || category.name,
      slug: slug || category.slug,
      description: description || category.description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image || category.image
    };
    
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    await Category.findByIdAndDelete(req.params.id);
    
    // Remove category reference from posts
    await Post.updateMany(
      { categories: req.params.id },
      { $pull: { categories: req.params.id } }
    );
    
    res.json({ message: 'Category removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
