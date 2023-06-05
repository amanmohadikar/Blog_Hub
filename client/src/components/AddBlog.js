import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };



const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "", body: "", tags: "", category: "", subcategory: "", isPublished: ""
  });



  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title, body: inputs.body, tags: inputs.tags, category: inputs.category,
        subcategory: inputs.subcategory, isPublished: inputs.isPublished,
        user: localStorage.getItem("userId")
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.body || !inputs.category) {
      alert("All Field is Mandatory")
    }
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection={"column"} width={"80%"}>

          <Typography fontWeight={"bold"} padding={3} color="grey" variant="h2" textAlign={"center"}>Post Your Blog </Typography>

          <InputLabel sx={labelStyles}> Title </InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin="auto" placeholder="Title" variant="outlined" />

          <InputLabel sx={labelStyles}>Body </InputLabel>
          <TextField name="body" onChange={handleChange} value={inputs.body} margin="auto" placeholder="Body" variant="outlined" />

          <InputLabel sx={labelStyles}>Tags (optional)</InputLabel>
          <TextField name="tags" onChange={handleChange} value={inputs.tags} margin="auto" placeholder="Tags" variant="outlined" />

          <InputLabel sx={labelStyles}>Subcategory (optional)</InputLabel>
          <TextField name="subcategory" onChange={handleChange} value={inputs.subcategory} margin="auto" placeholder="Subcategory" variant="outlined" />

          <InputLabel sx={labelStyles}>Category </InputLabel>
          <TextField name="category" onChange={handleChange} value={inputs.category} margin="auto" placeholder="Category" variant="outlined" />

          <InputLabel sx={labelStyles}>IsPublished (optional)</InputLabel>
          <TextField name="isPublished" onChange={handleChange} value={inputs.isPublished} margin="auto" placeholder="IsPublished" variant="outlined" />

          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit">Submit</Button>

        </Box>
      </form>
    </div>
  );
};

export default AddBlog;