import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };


function BlogDetail() {
  const navigate = useNavigate()
  const [blog, setBlogs] = useState()
  const id = useParams().id;
  console.log(id)

  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      body: inputs.body,
      category: inputs.category,
      isPublished: inputs.isPublished,
      tags: inputs.tags,
      subcategory: inputs.subcategory
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  console.log(blog)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"))
  }


  return (
    <div>
      {inputs &&
        <form onSubmit={handleSubmit}>
          <Box border={3} borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection={"column"} width={"80%"}>

            <Typography fontWeight={"bold"} padding={3} color="grey" variant="h2" textAlign={"center"}>Post Your Blog </Typography>

            <InputLabel sx={labelStyles}> Title </InputLabel>
            <TextField name="title" onChange={handleChange} value={inputs.title} margin="auto" placeholder="Title" variant="outlined" />

            <InputLabel sx={labelStyles}>Body </InputLabel>
            <TextField name="body" onChange={handleChange} value={inputs.body} margin="auto" placeholder="Body" variant="outlined" />

            <InputLabel sx={labelStyles}>Category </InputLabel>
            <TextField name="category" onChange={handleChange} value={inputs.category} margin="auto" placeholder="Category" variant="outlined" />

            <InputLabel sx={labelStyles}>IsPublished </InputLabel>
            <TextField name="isPublished" onChange={handleChange} value={inputs.isPublished} margin="auto" placeholder="IsPublished" variant="outlined" />

            <InputLabel sx={labelStyles}>Tag (add)</InputLabel>
            <TextField name="tags" onChange={handleChange} value={inputs.tags} margin="auto" placeholder="Tag" variant="outlined" />

            <InputLabel sx={labelStyles}>Subcategory (add)</InputLabel>
            <TextField name="subcategory" onChange={handleChange} value={inputs.subcategory} margin="auto" placeholder="Subcategory" variant="outlined" />

            <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit">Submit</Button>

          </Box>
        </form>}
    </div>
  )
}

export default BlogDetail