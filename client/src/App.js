import './App.css';
import Auth from './components/Auth';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import Header from './components/Header';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {authActions} from "./store"

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login())
    }
  }, [])


  return (
    <React.Fragment>

      <header>
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/myBlogs" element={<UserBlogs />}></Route>
          <Route path="/myBlogs/:id" element={<BlogDetail />}></Route>
          <Route path="/blogs/add" element={<AddBlog />}></Route>
        </Routes>
      </main>

    </React.Fragment>
  );
}

export default App;
