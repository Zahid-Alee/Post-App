import React, { useState, useEffect } from "react";
import Replies from "./Replies";

export default function RepliesContainer(props) {
  const replyButtonStyle = {
    fontSize: "13px",
    color: "blue",
    cursor: "pointer",
  };
  const [commnetText, setCommentText] = useState("");
  const [toogleReply, setToogleReply] = useState(false);
  const [repliesData, setrepliesData] = useState([]);

  const tooglePopUp = () => {
    setToogleReply(!toogleReply);
  };

  const newReplyData = () => {
    const date = new Date().toISOString();
    const data = {
      fields: {
        comment: commnetText,
        commentDate: date,
        parentID: props.commentID,
      },
    };
    tooglePopUp();

    setCommentText("");
    insertReply(data);
  };

  const insertReply = async (data) => {
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
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(
      "https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Comments/?api_key=key15JO6J5kG6vX6r"
    );
  }, []);

  const fetchData = async (url) => {
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setrepliesData(data.records);
      });
  };

  return (
    <>
      {repliesData.length > 0 ? (
        repliesData.map((elements) => {
          if (elements.fields.parentID == props.commentID) {
            return <Replies repliesData={elements} key={elements.id} />;
          }
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center my-5">
          <strong> Loading Comments </strong>
          <div className="spinner-border text-warning m-4"></div>
        </div>
      )}
      <strong style={replyButtonStyle} onClick={tooglePopUp}>
        {" "}
        Reply
      </strong>
      {toogleReply ? (
        <div className="form-group ">
          <label htmlFor="comment">
            <b>Enter Reply:</b>
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
          <strong
            className="reply"
            style={{ cursor: "pointer" }}
            onClick={newReplyData}
          >
            Send
          </strong>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
