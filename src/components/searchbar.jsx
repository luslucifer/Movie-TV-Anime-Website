// import MyProvider from '../contex/contextProvider'
import MyContext from "../contex/createContext";
import "./style/searchBar.css";
import "./style/animation.css";
import { useEffect, useState, useContext } from "react";

function SearchBar(props) {
  const suggestions = document.getElementsByClassName("suggestion");
  var { array, setArray, options, genre } = useContext(MyContext);
  var [x, setQuerry] = useState("av");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${x}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        let tArray = data.results;
        let filteredArray = tArray.filter((o) => {
          return o.title;
        });
        setArray(filteredArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function
  }, [x]);

  const onChange = (event) => {
    // setTimeout(setQuerry(event.target.value),500,event)
    // console.log(x)
    setQuerry(event.target.value);
    if (event.target.value != "") {
      for (let i = 0; i < suggestions.length; i++) {
        let sug = suggestions[i];
        sug.style.display = "flex";
      }
    } else {
      for (let i = 0; i < suggestions.length; i++) {
        let sug = suggestions[i];
        sug.style.display = "none";
      }
    }
  };
  return (
    <div className={props.className}>
      <div className="searchBar">
        <form action="" className="searchFoem">
          <input
            onChange={onChange}
            type="text"
            autoComplete="off"
            placeholder="search..."
            id="mainS"
          />
        </form>
        {array.slice(0, 5).map((result, key) => {
          // console.log(result.title)
          let title = result.title;
          if (title != "") {
            return (
              <div key={key} className="suggestion" onClick={()=>{console.log('samir')}}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  className="suggestionsImg"
                  alt="poster"
                />
                <div className="content">
                  <h5 className="title">{title}</h5>
                  <div className="genre">
                    {result.genre_ids.map((id, key) => {
                      const genreObj = genre.find((obj) => obj.id === id);
                      return genreObj ? (
                        <div key={key} className="gn">
                          <h6 key={id}>{genreObj.name} </h6>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SearchBar;
