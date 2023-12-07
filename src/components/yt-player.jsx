import "./style/yt-player.css";
import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import { useContext } from "react";
import MyContext from "../contex/createContext";

function YoutubePlayer() {
  const [videoIdx, setVideoId] = useState("x8eRMQtjCBE");
  const { ids } = useContext(MyContext);
  useEffect(() => {
    function onIds() {
      return ids;
    }
    // updatePlayerId('bBq9UbzS12I')

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptingTag = document.getElementsByTagName("script")[0];
    firstScriptingTag.parentNode.insertBefore(tag, firstScriptingTag);

    var player;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        videoId: videoIdx,
        playerVars: {
          playsinline: 1,
          mute: 1,
          autoplay: 1,
          playlist: onIds(),
          color: "white",
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }
    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        console.log("Video has ended");
      }
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, [videoIdx, setVideoId, ids]);

  return (
    <div className="container">
      <div className="header">
        {/* <ul className="nav"> */}
        {/* <li>Home</li> */}
        {/* <li>TV</li> */}
        {/* <li> */}
        {/* <SearchBar className="search" /> */}
        {/* </li> */}
        {/* <li>Movie</li> */}
        {/* </ul> */}
        <div className="aboutIframe">
          <div className="player" id="player" name={videoIdx}></div>
        </div>
      </div>
    </div>
  );
}

export default YoutubePlayer;
