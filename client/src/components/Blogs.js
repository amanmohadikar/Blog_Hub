import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs() {

  const [blogs, setBlogs] = useState()


  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blog")
      .catch(err => console.log(err))
    const data = await res.data
    console.log(data)
    return data
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  }, [])
  console.log(blogs)


  return (
    <>
      {blogs && 
      blogs.map((blog) =>
        <Blog
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog._id}
          title={blog.title}
          body={blog.body}
            tags={blog.tags}
            subcategory={blog.subcategory}
            category={blog.category}
            isPublished={blog.isPublished}
          />
      )}
    </>
  )
}

export default Blogs