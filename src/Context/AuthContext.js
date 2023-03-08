import { createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const AuthState = {

    // Login:false,
    // setLogin: function (){
    //     this.Login=true;
    // },
    token: localStorage.getItem("token"),
    refreshUser: function () {
      if (this.token) return true;
      else return false;
    },
  };
  console.log(AuthState)

  return (
    <AuthContext.Provider value={AuthState}>{children}</AuthContext.Provider>
  );
};
