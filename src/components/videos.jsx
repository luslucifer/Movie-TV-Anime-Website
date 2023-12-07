// import { useState } from "react";
import "./style/videos.css";
// import { useEffect } from "react";
function Video(props) {
  // const [err, setError] = useState(false);

  // useEffect(()=>{
  //   let span = document.getElementsByTagName('span')[0]
  //   span.addEventListener('load',()=>{
  //     if(span.innerHTML == 'Video unavailable' ){
  //       return null //remove the iframe 
  //     }
  //   })
  // },[])

  return (
    <div className="videoPlayer">
      <iframe
        // onError={(err)=>console.error(err)}
        className="video"
        // onError={setError(true)}

        width="30"
        height="25"
        src={"https://www.youtube.com/embed/" + props.keyX}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
export default Video;
