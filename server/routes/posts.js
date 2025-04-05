const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const upload = require('../middleware/upload');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author_id', 'name avatar')
      .populate('categories', 'name slug')
      .sort({ created_at: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author_id', 'name avatar bio')
      .populate('categories', 'name slug');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a post
router.post('/', upload.single('cover_image'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, author_id, categories, featured, published, read_time } = req.body;
    
    const newPost = new Post({
      title,
      slug,
      excerpt,
      content,
      author_id,
      cover_image: req.file ? `/uploads/${req.file.filename}` : req.body.cover_image,
      featured: featured || false,
      published: published || true,
      read_time: read_time || 5,
      categories: categories ? categories.split(',') : []
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:id', upload.single('cover_image'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, author_id, categories, featured, published, read_time } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const updateData = {
      title: title || post.title,
      slug: slug || post.slug,
      excerpt: excerpt || post.excerpt,
      content: content || post.content,
      author_id: author_id || post.author_id,
      cover_image: req.file ? `/uploads/${req.file.filename}` : req.body.cover_image || post.cover_image,
      featured: featured !== undefined ? featured : post.featured,
      published: published !== undefined ? published : post.published,
      read_time: read_time || post.read_time,
      categories: categories ? categories.split(',') : post.categories,
      updated_at: Date.now()
    };
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('author_id', 'name avatar').populate('categories', 'name slug');
    
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
