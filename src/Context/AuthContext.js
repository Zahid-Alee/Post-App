import { createContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const AuthState = {

    
    refreshUser: function () {
      if (localStorage.getItem('token')) return true;
      else return false;
    },
  };


  return (
    <AuthContext.Provider value={AuthState}>{children}</AuthContext.Provider>
  );
};
