import React from 'react'

export default function Comments(props) {
  return (
    <>
      
    <div className="container" >
      <strong> {props.commenterName} </strong>
      <p >{props.comments}</p>
    </div>
    

    </>
  )
}
