import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const AuthControl = ({ component: Component }) => {
    const Authstate = useContext(AuthContext);
  
    const [isLogin, setIsLogin] = useState(Authstate.refreshUser());
  
    useEffect(() => {
      setIsLogin(Authstate.refreshUser());
    }, [isLogin]);
  
    const AuthenticatedComponent = () => {
      if (isLogin) {
        return <Component />;
      } else {
        return <Navigate to="/login" />;
      }
    };
  
    return <AuthenticatedComponent />;
  };
  
  
