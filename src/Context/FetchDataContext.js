import { createContext, useState } from "react";

export const FetchApiContext = createContext();
// export const PostDataContext =createContext();

export const FetchContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
  
    const fetchData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        // console.log(data)
        return data;
      };
      
    return (
      <FetchApiContext.Provider value={{ data, fetchData }}>
        {children}
      </FetchApiContext.Provider>
    );
  };
  
