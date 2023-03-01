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
    const data = {
      fields: {
        commenterName: commenterName,
        comment: commnetText,
        postID: `${PostID}`,
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
      {commentData && PostID ? (
        commentData.map((elements) => {
          if (elements.fields.postID == PostID) {
            return (
              <Comments
                key={elements.id}
                commenterName={elements.fields.commenterName}
                comments={elements.fields.comment}
              />
            );
          }
        })
      ) : (
        <h4>Fetching...</h4>
      )}

      {/* comments form */}

      <form className="commentForm">
        <div className="form-group m-2">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="form-group">
          <input
            className="form-control m-2"
            id="name"
            placeholder="Enter your name"
            value={commenterName}
            onChange={(event) => setCommenterName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            className="form-control m-2"
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
