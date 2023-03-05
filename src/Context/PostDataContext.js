import { createContext } from "react";

export const PostApiContext = createContext();
export const PostContextProvider = ({ children }) => {
  const postData = (url, data, api_key) => {
    fetch(url, {
      method: "PATCH",
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
