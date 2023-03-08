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
import AuthControl from "./Components/AuthControl";

function App() {
  // localStorage.clear()
  const AuthState= useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(AuthState.refreshUser());

  useEffect(() => {
    setIsLogin(AuthState.refreshUser());
  }, [isLogin]);
  return (
    <>
      <FetchContextProvider>
        <PostContextProvider>
          <Router>
            <Navbar loginState={isLogin} />
            <Routes>
              {/* <Route exact path="/" element={<AuthControl/>} /> */}
              <Route exact path="/" element={isLogin?<PostContainer/>:<Navigate to={'/login'}/>}/>
              <Route exact path="/post" element={isLogin?<PostItem/>:<Navigate to={'/login'}/>} />
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
