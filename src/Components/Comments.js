import React from "react";
import RepliesContainer from "./RepliesContainer";

export default function Comments(props) {
  return (
    <>
      <div className="container  my-3 border ">
        <strong className="small">
          {" "}
          {props.commentData.fields.commenterName}{" "}
        </strong>
        <span className="text-warning">{"----->"} </span>
        <span className="small">{props.commentData.fields.commentDate}</span>
        <p className="commentText">{props.commentData.fields.comment} </p>
        <RepliesContainer postID={props.postID} commentID={props.commentID} />
      </div>
    </>
  );
}
