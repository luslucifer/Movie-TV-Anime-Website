import { useEffect, useState } from "react";
import MyContext from "./createContext";
import json from "../components/data/yt.json";
// import { useLayoutEffect } from "react";

function MyProvider({ children }) {
  var [array, setArray] = useState([]);
  var [genre, setGenre] = useState([]);
  var [ytData, setYtData] = useState(["hellow samir"]);
  var [ids, setIds] = useState("");
  var [popularMovies, setPopularMovies] = useState([]);
  var [pageNo, setPageNo] = useState(1);
  var [clickedPosterObj, setClickedPosterObj] = useState({});
  var [imgs, setImgs] = useState([]);
  var arr = [];
  var [idForImg, setIdForImg] = useState(507089);
  var [ultimateObj, setUltimateObj] = useState({});
  var [id, setId] = useState(299534); //id for ultimate obj
  var [videoArr, setVideoArr] = useState([]);
  var [recommendations, setRecommendations] = useState([]);

  // console.log(tData)


  const auth = import.meta.env.VITE_REACT_APP_AUTH
  
  console.log(auth)
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:auth
    },
  };
  // fetching movies data
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGenre(data.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  // fetching popular popularMovies
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPopularMovies([...popularMovies, ...response.results]);
      })
      .catch((err) => console.error(err));
  }, [pageNo]);

  // fetching youtube data
  //   useEffect(() => {
  //     fetch(
  //       "https://www.googleapis.com/youtube/v3/search?key=AIzaSyC3-BfWlBvxqPWgI991VNjIydVex6T_m8I&type=video&part=snippet&maxResults=10000&channelId=UCWOA1ZGywLbqmigxE4Qlvuw&videoDuration=short&videoEmbeddable=true"
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setYtData(data);
  //       });
  //   }, []);

  useEffect(() => {
    json.items.map((array) => {
      let i = array.id.videoId;
      arr.push(i);
    });
    let join = arr.join(",");
    setIds(join);
  }, []);
  // fetching images
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${idForImg}/images?include_image_language=null&language=en`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setImgs(response.backdrops);
        //  console.log(response)
      })
      .catch((err) => console.error(err));
  }, [idForImg]);

  // this fetch will extract credits and ultimate information
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setUltimateObj(response))
      .catch((err) => console.error(err));
  }, [id, clickedPosterObj]);

  // console.log(id)

  //here codes will be extract videoObj
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVideoArr(response.results))
      .catch((err) => console.error(err));
  }, [clickedPosterObj, ultimateObj, id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setRecommendations(response.results))
      .catch((err) => console.error(err));
  }, [id, clickedPosterObj, ultimateObj]);

  return (
    <MyContext.Provider
      value={{
        array,
        setArray,
        options,
        genre,
        ytData,
        setYtData,
        ids,
        popularMovies,
        pageNo,
        setPageNo,
        clickedPosterObj,
        setClickedPosterObj,
        imgs,
        setImgs,
        idForImg,
        setIdForImg,
        ultimateObj,
        setUltimateObj,
        id,
        setId,
        videoArr,
        setVideoArr,
        recommendations,
        setRecommendations,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
