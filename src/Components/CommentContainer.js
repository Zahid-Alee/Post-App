import React, { useState, useEffect } from "react";
import Comments from "./Comments";
const CommentBox = () => {
  const [comment, setComment] = useState({ name: "", text: "",PID:'',commentDate:'' });
 { comment?console.log(comment): console.log('')
}  // const [commentID,setCommentID]= useState('')

  const [commentData, setCommentData] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);
  const PostID = searchParams.get("id");

  const insertComment =()=>{
    let date= new Date();
    setComment({comment,PID:PostID})
    setComment({comment,commentDate:date})
    console.log(comment)
  }
  // useEffect(() => {
  //   const likes = localStorage.getItem(`${PostID}`);
  //   if (likes) {
  //     setPostLikes(likes);
  //   }
  // }, []);

  // const handleLike = () => {
  //   const newLikes = postLikes + "test@gmail.com,";
  //   setPostLikes(newLikes);
  //   localStorage.setItem(`${PostID}`, newLikes);
  //   updateLikesField(`${PostID}`, newLikes);
  // };



  const fetchData = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCommentData(data.records);
      });
  };
  useEffect(() => {
    fetchData(
      "https://api.airtable.com/v0/appYp6Kk4gEM1SMyc/Comments?api_key=key15JO6J5kG6vX6r"
    );
  }, []);

 
  return (
    <>
      <h3>
        <span className="text-muted">Comments (2)</span>
      </h3>
      {commentData
        ? commentData.map((elements) => {
            return (
              <Comments
                key={elements.id}
                commenterName={elements.fields.commenterName}
                comments={elements.fields.comment}
              />
            );
          })
        : console.log("z")}

      {/* comments form */}

      <form>
        <div className="form-group m-2">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="form-group">
          <input
            className="form-control m-2"
            id="name"
            placeholder="Enter your name"
            value={comment.name}
            onChange={(event) =>
              setComment({ comment, name: event.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            className="form-control m-2"
            id="comment"
            rows="3"
            value={comment.text}
            onChange={(event) =>{
              let value= event.target.value;
              setComment({ comment, text: value })
            }

            }
            required
          ></textarea>
        </div>
        <button className="btn btn-primary m-2" onClick={insertComment}>
          Send
        </button>
      </form>
    </>
  );
};

export default CommentBox;
