import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, author: req.user._id });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not allowed" });

  await post.deleteOne();
  res.json({ message: "Deleted" });
};
