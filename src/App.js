import React  from "react";
import "./App.css";
import PostContainer from "./Components/PostContainer";
import PostItem from "./Components/PostItem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { FetchContextProvider } from "./Context/FetchDataContext";
import { PostContextProvider } from "./Context/PostDataContext";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

import { Auth } from "./middleware/Auth";

function App() {

  return (
    <>
      <FetchContextProvider>
        <PostContextProvider>
          <Router>
            <Navbar  />
            <Routes>
              <Route exact path="/" element={Auth(PostContainer)} />
              {/* <Route exact path="/posts" element={}/> */}
              <Route exact path="/post" element={Auth(PostItem)} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </PostContextProvider>
      </FetchContextProvider>
    </>
  );
}

export default App;
