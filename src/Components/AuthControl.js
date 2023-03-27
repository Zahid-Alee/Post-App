import React, { useContext,useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function AuthControl(props) {
  const checkUser = useContext(AuthContext);
  
  const checkLogin=()=>{
    return checkUser()
  }
  const [isLogin,setIsLogin]=useState(checkLogin())


 useEffect(()=>{
setIsLogin(checkLogin())
  

 },[])
// const authState = useContext(AuthContext);
// const isLogin= authState.is;
 
  console.log(isLogin)

  return(
    <>
    {
        isLogin?
        <Navigate to={'/'} />
        :
        <Navigate to={'/login'} />

    }
    </>
  )
}
