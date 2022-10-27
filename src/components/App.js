import React, { useReducer, useEffect } from "react";
import "../App.css";
import Movie from "./Movie";
import Search from "./Search";
import spinner from "../loading.gif";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((res) => res.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key":
          "live_5v3MiqnkHRhfk5VDdCO7cIq8wy818eEYchniKplOXWeNoFc62s3z3dBLCcGvJNJB",
      },
    };

    fetch(
      `https://api.thecatapi.com/v1/breeds/search?q=${searchValue}`,
      options
    )
      .then((res) => res.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Search search={search} />
      <p className="App-intro"> Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <img className="spinner" src={spinner} alt="loading spinner" />
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => <Movie key={index} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default App;
