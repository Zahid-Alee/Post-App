import React, { useState, useEffect } from "react";
import CommentContainer from "./CommentContainer";

export default function PostItem() {
  const [postData, setPostData] = useState({});

  //geting id from the url
  const searchParams = new URLSearchParams(window.location.search);
  const PostID = searchParams.get("id");

  // fetching data through from a specific record id
  const fetchData = async (url) => {
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.fields);
        console.log(data.fields);
      });
  };

  useEffect(() => {
    fetchData(
      `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}/?api_key=key15JO6J5kG6vX6r`
    );
  }, []);

  const handleLike = () => {
    // Increment the number of likes by adding dummy email
    let newLikes = "";

    if (postData.Likes) {
      newLikes = postData.Likes + "test@gmail.com,";
      updateLikesField(`${PostID}`, newLikes);
    } else {
      newLikes = "test@gmail.com,";
      updateLikesField(`${PostID}`, newLikes);
    }
  };

  const updateLikesField = async (recordId, newLikesValue) => {
    try {
      await fetch(
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
      fetchData(
        `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}/?api_key=key15JO6J5kG6vX6r`
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {Object.keys(postData).length > 0 ? (
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
                  className="btn btn-outline-warning"
                  onClick={handleLike}
                >
                  <i className="bi bi-hand-thumbs-up me-2"></i>{" "}
                  <span>
                    {postData.Likes ? postData.Likes.split(",").length - 1 : 0}
                  </span>{" "}
                  Like
                </button>
              </div>

              <hr className="my-4" />

              <CommentContainer />
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <strong> Loading Post </strong>
          <div className="spinner-border text-warning m-4"></div>
        </div>
      )}
    </>
  );
}
