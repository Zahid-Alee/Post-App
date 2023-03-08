import React, { useContext,useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function AuthControl() {
  const Authstate = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(Authstate.refreshUser());

  useEffect(() => {
    setIsLogin(Authstate.refreshUser());
  }, [isLogin]);
 
//   console.log(isLogin)

  return(
    <>
    {
        isLogin?
        <Navigate to={'/posts'} />
        :
        <Navigate to={'/login'} />

    }
    </>
  )
}
