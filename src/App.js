import { createContext, useState,useContext,React } from "react";
import './App.css';
import PostContainer from './Components/PostContainer';
import PostItem from './Components/PostItem';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { FetchContextProvider } from './Context/FetchDataContext';
import {PostContextProvider} from './Context/PostDataContext'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
// import {  } from "react";

export const AuthContext = createContext();

export const AuthContextProvider= ({children})=>{
  const [isLogin,setIsLogin]=useState(false);

  return (
    <AuthContext.Provider value={{isLogin,setIsLogin}}>
      {children}
    </AuthContext.Provider>
  )
}

function App() {
  const {isLogin , setIsLogin} =useContext(AuthContext)
  console.log(isLogin)

  return (
    <>
      <FetchContextProvider>
        <PostContextProvider>
          
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={ isLogin? <PostContainer/>:<Login/>}></Route>
              <Route exact path="/post" element={isLogin? <PostItem />:<Login/>}></Route>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path ='/signup' element={<SignUp/>}/>
              
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
