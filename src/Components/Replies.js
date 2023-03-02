import React from 'react'

export default function Replies(props) {
  return (
    <>
    <div className="container  my-3 border ">
        <strong className="small"> {props.repliesData.fields.commenterName} </strong>
        <span className="text-warning">{"----->"} </span>
        <span className="small">{props.repliesData.fields.commentDate}</span>
        <p className="commentText">{props.repliesData.fields.comment} </p>
        {/* <RepliesContainer/> */}
      </div>
    </>
  )
}
