// import React from "react";
// import { YouTubePlayer } from "react-youtube";
import "./App.css";
// import Card from "./components/card";
// import SearchBar from "./components/searchbar";
// import YoutubePlayer from "./components/yt-player";
import Body from "./components/body";
import Movie from "./components/movie";
import Nav from "./components/nav";
import YoutubePlayer from "./components/yt-player";
// import IntersectionObserverComponent from "./components/loadingPage";
import MyProvider from "./contex/contextProvider";
import { BrowserRouter as Router ,Routes, Route   } from "react-router-dom";

function App() {
  return (
    <MyProvider>
      <Router>
      <div className="mainContainer">
        <Nav></Nav>
        {/* <Body></Body> */}
        {/* <Movie></Movie> */}
        {/* <IntersectionObserverComponent></IntersectionObserverComponent> */}
      </div>
      <Routes>
        <Route path="/popular" element={<Body></Body>}></Route>
      <Route path="/movie/:qName" element={<Movie/>} />
      <Route path="/" element={<YoutubePlayer></YoutubePlayer>} ></Route>
      </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
