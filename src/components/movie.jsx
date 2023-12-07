import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../contex/createContext";
import "./style/movie.css";
import Cast from "./cast";
import Video from "./videos";
import TmdbBackdrop from "./tmdbBackdrop";
// import SVGspinner from "../assets/SVGspinner.jsx";
function Movie() {
  const {
    clickedPosterObj,
    setClickedPosterObj,
    options,
    setIdForImg,
    imgs,
    ultimateObj,
    setId,
    videoArr,
    recommendations,
    setRecommendations,
  } = useContext(MyContext);
  const { qName } = useParams();
  const [movieId, setMovieId] = useState();
  const iframe = useRef(null);
  const [loaded, setLoaded] = useState(true);
  const [title, setTitle] = useState("Artoria");
  const [score, setScore] = useState("score");
  const [overview, setOverview] = useState("");
  const [genreStr, setGenreStr] = useState("helllow");
  const [renderVideo, setRenderVideos] = useState(true);
  // console.log(clickedPosterObj.title)
  function backdropClicked() {
    setRenderVideos(false);
  }

  useEffect(() => {
    if (qName != clickedPosterObj.title) {
      console.log("notmatched");
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${qName}&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setClickedPosterObj(response.results[0]);
          setMovieId(response.results[0].id);
          setIdForImg(response.results[0].id);
          setId(response.results[0].id);
          setIdForImg(response.results[0].id);
          // console.log(movieId);
        })
        .catch((err) => console.error(err));
    } else {
      setMovieId(clickedPosterObj.id);
      setIdForImg(clickedPosterObj.id);
      setId(clickedPosterObj.id);
      setIdForImg(clickedPosterObj.id);
      // console.log(movieId)
    }
  }, []);

  useEffect(() => {
    try {
      setTitle(
        clickedPosterObj.title +
          `(${clickedPosterObj.release_date.substring(0, 4)})`
      );
      setOverview(clickedPosterObj.overview);
    } catch (err) {
      // console.error(err);
    }
  }, [clickedPosterObj]);

  // console.log(clickedPosterObj)
  // console.log(imgs)
  useEffect(() => {
    try {
      let str = "";
      ultimateObj.genres.map((obj) => {
        let str2 = `${obj.name},`;
        str = str + str2;
      });
      setGenreStr(str);
    } catch (err) {
      // console.error(err)
      console.log(ultimateObj.genres);
    }
  }, [clickedPosterObj, ultimateObj]);

  // functions to click Media buttons
  function videoClicked() {
    setRenderVideos(true);
  }
  function backdropClicked() {
    setRenderVideos(false);
  }

  return (
    <div className="container">
      <div className="iframeBox">
        <iframe
          onLoad={() => {
            setLoaded(false);
          }}
          ref={iframe}
          className="iframe"
          src={`https://vidsrc.to/embed/movie/${movieId}`}
          allowFullScreen={true}
        ></iframe>
        {loaded ? (
          <img
            className="backdrop"
            src={`https://image.tmdb.org/t/p/original/${clickedPosterObj.backdrop_path}`}
            alt=""
          />
        ) : null}
        <div className="mHeading">
          <h2 className="title TAC">{title}</h2>
        </div>
        <div className="score-Clip">
          <div className="score">score</div>
          <div className="clip">
            <button>play clip</button>
          </div>
        </div>
        <div className="genres TAC">
          <h4 className="genreS TAC">{genreStr}</h4>
        </div>

        <div className="overview TAC">
          <h2 id="overview TAC">overview</h2>
          <h3 className="overview TAC">{overview}</h3>
        </div>
        <div className="casts">
          <h2 className="TAC">Casts</h2>
          <ul className="castL">
            {Object.keys(ultimateObj).length !== 0
              ? ultimateObj.credits.cast.map((obj, index) => {
                  return (
                    // <li className="cast" key={index}>{obj.name}</li>
                    <Cast
                      name={obj.name}
                      key={index}
                      obj={obj}
                      srcSet={`
                    https://image.tmdb.org/t/p/w45/${obj.profile_path} 45w ,
                    https://image.tmdb.org/t/p/w185/${obj.profile_path} 185w,
                    https://image.tmdb.org/t/p/h632/${obj.profile_path} h632,
                    https://image.tmdb.org/t/p/original/${obj.profile_path} 1920w,

                  `}
                      sizes="(max-width: 600px) 280px,
                  (max-width: 900px) 540px,
                  (max-width: 1200px) 800px,
                  (max-width: 1800px) 1200px,
                  1800px"
                    />
                  );
                })
              : console.log("not loaded")}
          </ul>
        </div>
        <div className="media TAC">
          <h2 id="media TAC">media</h2>
          <button className="videoBtn" onClick={videoClicked}>
            Videos
          </button>
          <button className="backdrops" onClick={backdropClicked}>
            Backdrop
          </button>

          <ul className="mediaUl">
            {renderVideo ? (
              videoArr.slice(0, 4).map((obj, index) => {
                return (
                  <li key={index}>
                    <Video keyX={obj.key} />
                  </li>
                  // <h1 key={index}>samir</h1>
                );
              })
            ) : (
              <li>{genreStr}</li>
            )}
            <li className="viewMore">
              <pre className="rightMargin">
                <h2>
                  View More <strong>&#x2192;</strong>
                </h2>
              </pre>
            </li>
          </ul>
        </div>
        <div className="recommendations">
          <h2 className="TAC">
          Recommendations
          </h2>
          <ul className="ulAC">
              {recommendations.map((obj,index)=>{
                return(
                  <li key={index}>
                    <TmdbBackdrop backdropPath={obj.backdrop_path} size={`70vw`}></TmdbBackdrop>
                    <div className="flex-dr-row ">
                      <h4>{obj.title}</h4>
                      <h4 className="m-l-a">{Math.round(obj.vote_average*10) +"%"}</h4>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original/${clickedPosterObj.backdrop_path}`}
        alt={`backdrop of (${clickedPosterObj.title})`}
        className="background "
      />
    </div>
  );
}

export default Movie;
