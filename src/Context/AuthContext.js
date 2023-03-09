import { createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const checkUser=()=>{
    if(localStorage.getItem('token'))
    return true;
    else return false
  }

//  useEffect(()=>{
// // setIsLogin(checkUser());

//  },[])

//  const authState= {
//   isLogin : checkUser(),

//  }

  return (
    <AuthContext.Provider value={checkUser}>{children}</AuthContext.Provider>
  );
};
