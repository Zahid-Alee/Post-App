import React, { useState, useEffect } from "react";
import Comments from "./Comments";

const CommentBox = () => {
  const [commenterName, setCommenterName] = useState("");
  const [commnetText, setCommentText] = useState("");
  const [commentData, setCommentData] = useState([]);
  // const commentForm=document.querySelector('form')

  const searchParams = new URLSearchParams(window.location.search);
  const PostID = searchParams.get("id");

  const newCommentData = () => {
    const date = new Date().toISOString();
    const data = {
      fields: {
        commenterName: commenterName,
        comment: commnetText,
        postID: `${PostID}`,
        commentDate: date,
      },
    };

    setCommenterName("");
    setCommentText("");
    insertData(data);
  };
  const insertData = async (data) => {
    try {
      await fetch(`https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Comments`, {
        method: "POST",
        headers: {
          Authorization: "Bearer key15JO6J5kG6vX6r",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchData(
        "https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Comments/?api_key=key15JO6J5kG6vX6r"
      );
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (url) => {
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCommentData(data.records);
      });
  };
  useEffect(() => {
    fetchData(
      "https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Comments/?api_key=key15JO6J5kG6vX6r"
    );
  }, []);

  return (
    <>
      <h3>Comments:</h3>
      {commentData.length > 0 ? (
        commentData.map((elements) => {
          if (elements.fields.postID == PostID) {
            return (
              <Comments
                key={elements.id}
                commenterName={elements.fields.commenterName}
                comments={elements.fields.comment}
                commentsDate={elements.fields.commentDate}
              />
            );
          }
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
        <strong> Loading Comments </strong>
        <div className="spinner-border text-warning m-4"></div>
      </div>
      )}

      {/* comments form */}

      <form className="commentForm border  p-2">
        <div className="form-group m-2">
          <label htmlFor="name">
            <b>Name:</b>
          </label>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={commenterName}
            onChange={(event) => setCommenterName(event.target.value)}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="comment">
            <b>Comment:</b>
          </label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={commnetText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
            required
          ></textarea>
        </div>
      </form>
      <button className="btn btn-primary m-2" onClick={newCommentData}>
        Send
      </button>
    </>
  );
};

export default CommentBox;
