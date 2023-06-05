import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from "./Blog"

const UserBlogs = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId")
  const sendRequest = async () => {

    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
      const data = await res.data
      console.log(data)
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user)) // setBlogs(data.user.blogs)
  }, [])



  console.log(user)
  return (
    <div>
      {user && user.blogs &&
        user.blogs.map((blog, index) =>
          <Blog key={index}
            isUser={true}
            id={blog._id}
            title={blog.title}
            body={blog.body}
            tags={blog.tags}
            subcategory={blog.subcategory}
            category={blog.category}
            isPublished={blog.isPublished}
             />
        )}
    </div>
  )
}

export default UserBlogs
