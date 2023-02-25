import React, { useEffect, useState } from "react";
import Post from "./Posts";

export default function PostContainer() {
  const [postData, setPostData] = useState([]);

  const fetchData = (url) => {
    return fetch(url)
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
          {postData
            ? postData.map((post) => {
                return <div className="col-auto" key={post.id}>
                  <Post title={post.fields.title}  cover_image={post.fields.cover_image} content={post.fields.content} id={post.id}/>
                </div>;
              })
            : 
           <h3 className="text-light">Fetching Data.....</h3> }
        </div>
        ;
      </div>
    </>
  );
}
