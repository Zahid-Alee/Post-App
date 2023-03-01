
import './App.css';
import PostContainer from './Components/PostContainer';
import PostItem from './Components/PostItem';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import CommentContainer from './Components/CommentContainer'

function App() {
  return (
   <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<PostContainer/>}></Route>
          <Route exact path="/post" element={<PostItem />}></Route>
          
        </Routes>
      </Router>
   </>
  );
}


export default App;
