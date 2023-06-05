const mongoose = require("mongoose")
const Blog = require("../Model/Blog")
const User = require("../Model/User")

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};


const addBlog = async (req, res, next) => {
  let { title, body, category, user, tags, isPublished, publishedAt, subcategory } = req.body;
  if (!title) return res.status(400).json({ message: "title must be present" })
  if (!body) return res.status(400).json({ message: "body must be present" })
  if (!category) return res.status(400).json({ message: "category must be present" })

  let date = Date.now()

  if (isPublished) {
    publishedAt = date
    isPublished = true
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
  }
  const blog = new Blog({
    title, body, category, user, tags, isPublished, publishedAt, subcategory
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ blog });
};

const updateBlog = async (req, res, next) => {
  const { title, body, category, isPublished, tags, subcategory } = req.body; 
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findOneAndUpdate(
      {_id : blogId},
      { $set : {title, body, category, isPublished},
       $push : { tags: tags, subcategory: subcategory }})

  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }
  return res.status(200).json({ blog });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findOne({ id: id });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};

module.exports = { getByUserId, deleteBlog, getById, updateBlog, addBlog, getAllBlogs }