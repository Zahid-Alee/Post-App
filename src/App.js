import { createContext, useState, useContext, React, useEffect } from "react";
import "./App.css";
import PostContainer from "./Components/PostContainer";
import PostItem from "./Components/PostItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { FetchContextProvider } from "./Context/FetchDataContext";
import { PostContextProvider } from "./Context/PostDataContext";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import { AuthControl } from "./Components/AuthControl";


// localStorage.clear()
function App() {
  return (
    <>
      <FetchContextProvider>
        <PostContextProvider>
          <Router>
            <Navbar />
            <Routes>
              {/* <Route exact path="/" element={<AuthControl/>} /> */}
              <Route
                exact
                path="/"
                element={<AuthControl component={PostContainer} />}
              />
              <Route
                exact
                path="/post"
                element={<AuthControl component={PostItem} />}
              />

              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </PostContextProvider>
      </FetchContextProvider>
    </>
  );
}

export default function AppWithAuth() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}
