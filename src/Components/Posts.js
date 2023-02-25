import React from 'react'
import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Post(props) {

  return (
    <>
   <Link style={{textDecoration:'none',color:'black'}} to={"/post?id="+ props.id}>
    <div className="card my-4" style={{ width: "18rem" }}>
        <img className="card-img-top" src={props.cover_image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
           {props.content.slice(0,50)}...
          </p>
          <button className='btn btn-warning text-light'>View Post</button>
        </div>
      </div>
    </Link>


     
  </>
  )
}
