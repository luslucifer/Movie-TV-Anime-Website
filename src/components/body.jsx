import { useContext, useEffect,useRef,useState } from "react";
import Card from "./card";
import MyContext from "../contex/createContext";
import "./style/body.css";
function Body() {
  const { popularMovies,setPageNo,pageNo } = useContext(MyContext);
  const [prevScrollPosition,setPrevScrollPosition] = useState(0)
 
  
  const ob = useRef(null)
  const cardsHolder = useRef(null)
  useEffect(()=>{  
    const observer = new IntersectionObserver(entrys=>{
      entrys.forEach(entry=>{
        if(entry.isIntersecting){
          // console.log('intersecting')
          setPrevScrollPosition(window.scrollY)
          setPageNo((prev)=>prev+1)
          // console.log(pageNo)
        }
      })
    })

    observer.observe(ob.current)
  },[])

  useEffect(()=>{console.log(pageNo)},[pageNo])

 
  return (
        
    <div className="mContainer">
      <div ref={cardsHolder} className="cards">
        {popularMovies.map((obj, key) => {
          return (
              <Card
                key={key}
                src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`}
                srcSet={
                `
                  https://image.tmdb.org/t/p/w92/${obj.poster_path} 92w ,
                  https://image.tmdb.org/t/p/w154/${obj.poster_path} 154w,
                  https://image.tmdb.org/t/p/w185/${obj.poster_path} 185w,
                  https://image.tmdb.org/t/p/w342/${obj.poster_path} 342w,
                  https://image.tmdb.org/t/p/w500/${obj.poster_path} 500w,
                  https://image.tmdb.org/t/p/w780/${obj.poster_path} 780w
                `
                }
                
                sizes="(max-width: 600px) 280px,
                (max-width: 900px) 540px,
                (max-width: 1200px) 800px,
                (max-width: 1800px) 1200px,
                1800px"
       

                obj = {obj}

              ></Card>
          );
        })}
        <div ref={ob} id="target" className="target"><h1>observe me </h1></div>
      </div>
    </div>
  );
}

export default Body;
