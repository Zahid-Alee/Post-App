import { createContext } from "react";

export const PostApiContext = createContext();
export const PostContextProvider = ({ children }) => {
  const postData = (url, data, api_key,method) => {
    fetch(url, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        fields: data,
      }),
    });
  };

  return (
    <>
      <PostApiContext.Provider value={postData}>
        {children}
      </PostApiContext.Provider>
    </>
  );
};
