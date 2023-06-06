const express = require("express")

let  {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getByUserId,
  updateBlog,
} = require("../controllers/blog-controller")
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);


module.exports = blogRouter