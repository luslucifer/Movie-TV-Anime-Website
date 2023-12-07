import "./style/card.css";
import playSvg from "../assets/img/play.svg";
import { useEffect, useRef,useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contex/createContext";
function Card(props) {
  const {setClickedPosterObj} = useContext(MyContext)
  const ref = useRef();
  

  useEffect(() => {
    const element = ref.current;
    element.style.transition='0.1s'
    var intervalId = null
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          intervalId = setInterval(()=>{
            let elementRect = element.getBoundingClientRect()
            let viewportHeight = window.innerHeight
            let elementTop = Math.max(elementRect.top,0)
            let elementBottom = Math.min(elementRect.bottom,viewportHeight)
            let visibleHeight = (elementBottom-elementTop)
            let persentage = visibleHeight/elementRect.height
            // console.log(persentage)
            // console.log(visibleHeight/2)
            element.style.opacity=`${Math.max(0.2,persentage)}`

          },100)
        }
        else{
          clearInterval(intervalId)
          intervalId = null
        }
      });
    });

    observer.observe(element);
  }, []);
  function cardClick(){

  }

  return (
    <div>
      <div className="card" ref={ref} onClick={()=>{cardClick}}>
        <img className="poster" src={props.src} onLoad={()=>{}} srcSet={props.srcSet} sizes={props.sizes} alt="" />
       <Link to={`/movie/${props.obj.title}`}> <img className="playBtn" src={playSvg} onClick={()=>{setClickedPosterObj(props.obj)}}></img></Link>
      </div>
    </div>
  );
}

export default Card;
