import React, { useEffect, useContext, useState } from "react";
import { FetchApiContext } from "../Context/FetchDataContext";
import { PostApiContext } from "../Context/PostDataContext";
import CommentContainer from "./CommentContainer";

export default function PostItem() {
  const { data, fetchData } = useContext(FetchApiContext);
  //geting id from the url
  const searchParams = new URLSearchParams(window.location.search);
  const PostID = searchParams.get("id");

  const [showLikes, setShowLikes] = useState(0);

  const postData = useContext(PostApiContext);

  useEffect(() => {
    fetchData(
      `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}/?api_key=key15JO6J5kG6vX6r`
    );
    // setShowLikes(data.fields.Likes.split(",").length - 1);
  }, []);

  const handleLike = () => {
    // Increment the number of likes by adding dummy email
    setShowLikes(showLikes + 1);
    let newLikes = "";
    const apiKey = "key15JO6J5kG6vX6r";
    let newData = {};
    if (data.fields.Likes) {
      newLikes = data.fields.Likes + "test@gmail.com,";

      newData = {
        Likes: newLikes,
      };
      updateLikesField(
        `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}`,
        newData,
        apiKey
      );
    } else {
      newLikes = "test@gmail.com,";
      newData = {
        Likes: newLikes,
      };
      updateLikesField(
        `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}`,
        newData,
        apiKey
      );
    }
  };

  const updateLikesField = async (url, newData, api_key) => {
    try {
      await postData(url, newData, api_key,'PATCH');
      fetchData(
        `https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Posts/${PostID}/?api_key=key15JO6J5kG6vX6r`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data && data.fields ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="mt-4 mb-3 text-center">{data.fields.title}</h1>
              <img
                className="img-fluid d-block mx-auto mb-4"
                src={data.fields.cover_image}
                alt="Post"
              />
              <p className="text-muted text-center mb-2">
                By <span>{data.fields.author_name}</span> |{" "}
                {data.published_date}
              </p>
              <p>{data.fields.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-outline-warning"
                  onClick={handleLike}
                >
                  <i className="bi bi-hand-thumbs-up me-2"></i>{" "}
                  <span>{data.fields.Likes?.split(",").length - 1}</span> Like
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
