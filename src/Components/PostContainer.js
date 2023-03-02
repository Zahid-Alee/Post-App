import React, { useEffect, useState } from "react";
import Post from "./Posts";

export default function PostContainer() {
  const [postData, setPostData] = useState([]);

  const fetchData = async (url) => {
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.records);
      });
  };

  useEffect(() => {
    fetchData(
      "https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts?api_key=key15JO6J5kG6vX6r"
    );
  }, []);

  return (
    <>                 

      <div className="container my-4">
        <h1 className="text-center text-dark">Blog Post</h1>
        <div className="row d-flex justify-content-center">
          {postData.length>0
            ? postData.map((post) => {
                return <div className="col-auto" key={post.id}>
                  <Post title={post.fields.title}  cover_image={post.fields.cover_image} content={post.fields.content} id={post.id}/>
                </div>;
              })
            : 
            <div className="d-flex justify-content-center align-items-center my-5">
            <strong> Loading Data</strong>
            <div className="spinner-border text-warning m-4"></div>
          </div> }
        </div>
        ;
      </div>
    </>
  );
}
