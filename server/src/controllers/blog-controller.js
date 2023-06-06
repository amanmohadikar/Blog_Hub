const mongoose = require("mongoose")
const Blog = require("../Model/Blog")
const User = require("../Model/User")


const getAllBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find().populate("user")
    if (!blogs) return res.status(404).json({ message: "No Blogs Found" });
    return res.status(200).json({ blogs })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


const addBlog = async (req, res) => {
  try {

    let { title, body, category, user, tags, isPublished, publishedAt, subcategory } = req.body;
    if (!title) return res.status(400).json({ message: "title must be present" })
    if (!body) return res.status(400).json({ message: "body must be present" })
    if (!category) return res.status(400).json({ message: "category must be present" })

    let date = Date.now()

    if (isPublished) {
      publishedAt = date
      isPublished = true
    }

    let existingUser = await User.findById(user);

    if (!existingUser) return res.status(400).json({ message: "Unable TO FInd User By This ID" });

    const blog = new Blog({ title, body, category, user, tags, isPublished, publishedAt, subcategory });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      return res.status(500).json({ message: err });
    }

    return res.status(200).json({ blog });
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
};



const updateBlog = async (req, res, next) => {
  try {

    const { title, body, category, isPublished, tags, subcategory } = req.body;
    const blogId = req.params.id;
    let blog = await Blog.findOneAndUpdate({ _id: blogId }, { $set: { title, body, category, isPublished }, $push: { tags: tags, subcategory: subcategory } })

    if (!blog) return res.status(500).json({ message: "Unable To Update The Blog" });

    return res.status(200).json({ blog });
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let blog = await Blog.findOne({ id: id });

    if (!blog) return res.status(404).json({ message: "No Blog Found" });

    return res.status(200).json({ blog });
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
};



const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    let blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    if (!blog) return res.status(500).json({ message: "Unable To Delete" });

    return res.status(200).json({ message: "Successfully Delete" });
  } catch (err) {
    console.log(err);
  }
};



const getByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    let userBlogs = await User.findById(userId).populate("blogs");

    if (!userBlogs) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    return console.log(err);
  }
};

module.exports = { getByUserId, deleteBlog, getById, updateBlog, addBlog, getAllBlogs }