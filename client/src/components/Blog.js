import {Avatar,Box,Card,CardContent,CardHeader,IconButton,Typography,} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Blog = ({ title, userName, isUser, id, body, tags, subcategory, category, isPublished }) => {

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };



  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };



  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };



  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >


        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}



        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />


        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary">

            <br />
            {"body"}{" : "} {body}

            <hr />
            <br />
            {"tags"}{" : "} {tags}

            <hr />
            <br />
            {"subcategory"}{" : "} {subcategory}

            <hr />
            <br />
            {"category"}{" : "} {category}

            <hr />
            <br />
            {"isPublished"}{" : "} {isPublished}

          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;