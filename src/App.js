
import './App.css';
import PostContainer from './Components/PostContainer';
import PostItem from './Components/PostItem';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
// import CommentContainer from './Components/CommentContainer'
import { FetchContextProvider } from './Context/FetchDataContext';
import {PostContextProvider} from './Context/PostDataContext'

function App() {
  return (
   <>
   <FetchContextProvider>
    <PostContextProvider>
   <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<PostContainer/>}></Route>
          <Route exact path="/post" element={<PostItem />}></Route>
          
        </Routes>
      </Router>
      </PostContextProvider>
   </FetchContextProvider>
     
   </>
  );
}


export default App;
