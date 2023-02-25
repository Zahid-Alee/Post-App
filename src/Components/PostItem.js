import React, { useState, useEffect } from "react";
import CommentContainer from "./CommentContainer";


export default function PostItem() {
  const [postData, setPostData] = useState({});

  //geting id from the url
  const searchParams = new URLSearchParams(window.location.search);
  const PostID = searchParams.get("id");

  // fetching data through from a specific record id
  const fetchData = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.fields);
      });
  };

  useEffect(() => {
    fetchData(
      `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}/?api_key=key15JO6J5kG6vX6r`
    );
  }, []);
  // let likes=0
  // const [likes,setLikes]=useState([]);

  //  const incrementLikes=()=>{
  //   setLikes(likes.push('#'));
  //    localStorage.setItem('likes',likes);
  // }

  const [postLikes, setPostLikes] = useState("");
  useEffect(() => {
    const likes = localStorage.getItem(`${PostID}`);
    if (likes) {
      setPostLikes(likes);
    }
  }, []);

  const handleLike = () => {
    // Increment the number of likes by 1
    const newLikes = postLikes + "test@gmail.com,";
    setPostLikes(newLikes);
    // Store the number of likes in local storage
    localStorage.setItem(`${PostID}`, newLikes);
    updateLikesField(`${PostID}`, newLikes);
  };

  const updateLikesField = async (recordId, newLikesValue) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${recordId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer key15JO6J5kG6vX6r`,
          },
          body: JSON.stringify({
            fields: {
              Likes: newLikesValue,
            },
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {postData ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="mt-4 mb-3 text-center">{postData.title}</h1>
              <img
                className="img-fluid d-block mx-auto mb-4"
                src={postData.cover_image}
                alt="Post"
              />
              <p className="text-muted text-center mb-2">
                By <span>{postData.author_name}</span> |{" "}
                {postData.published_date}
              </p>
              <p>{postData.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLike}
                >
                  <i className="bi bi-hand-thumbs-up me-2"></i>{" "}
                  <span>{postLikes.split(",").length - 1}</span> Like
                </button>
              </div>

              <hr className="my-4" />
              
              <CommentContainer/>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-light">Fetching..</h3>
      )}
    </>
  );
}
