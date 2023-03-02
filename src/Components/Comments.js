import React, { useState } from 'react'
import Replies from './Replies';

export default function Comments(props) {

  const replyButtonStyle={fontSize:'13px',color:'blue',cursor:'pointer'}

  const [toogleReply,setToogleReply]=useState(false);
  const [commnetText, setCommentText] = useState("");

 const popUpReply=()=>{
    setToogleReply(!toogleReply)
  }

  return (
    <>
      
    <div className="container  my-3 border " >
      <strong className='small'> {props.commenterName} </strong><span className='text-warning'>{'----->'} </span>
      <span className='small'>{props.commentsDate}</span>
      <p className='commentText'>{props.comments} </p>
      <Replies/>
      <strong style={replyButtonStyle}
      onClick={popUpReply}> Reply</strong>
       
      {toogleReply?
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
       <strong className="reply" style={{cursor:'pointer'}}>Send</strong>
     </div>:
      <div></div> }
    </div>
    
    

    </>
  )
}
