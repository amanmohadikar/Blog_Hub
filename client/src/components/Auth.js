import axios from 'axios'
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const [inputs, setInputs] = useState({
    name: "", email: "", password: "",
  })
  const [isSignup, setIsSignup] = useState(false)
  function handleChange(e) {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data)
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!inputs.email || !inputs.password){
      alert("Please Fill all fields")
    }
    console.log(inputs)
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={"column"} alignItems="center"
          justifyContent={"center"} boxShadow="10px 10px 20px #ccc"
          padding={3} margin="auto" marginTop={5} borderRadius={5}
          maxWidth={400}>

          <Typography variant="h2" padding={3} textAlign="center">{isSignup ? "Signup" : "Login"} </Typography>

          {isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} type={"name"} placeholder="Name" label="Name" margin="normal" />}{" "}
          <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} placeholder="Email" label="Email" margin="normal" />
          <TextField name="password" onChange={handleChange} value={inputs.password} type={"password"} placeholder="Password" label="Password" margin="normal" />

          <Button type="submit" sx={{ borderRadius: 3, margin: 2 }} color="warning" variant="contained">Submit</Button>
          <Button onClick={() => setIsSignup(!isSignup)} sx={{ borderRadius: 3 }}>Change to {isSignup ? "Login" : "SignUp"} </Button>
        </Box>
      </form >
    </>
  )
}
export default Auth

