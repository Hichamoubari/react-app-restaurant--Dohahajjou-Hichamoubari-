import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/restaurant";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchChair, setSearchChair] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, chair } = queryString.parse(window.location.search);
     //console.table({ location, date, chair });
    searchListings({ location, date, chair }).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
      setRestaurants(res.data);
    });
  }, [window.location.search]);

  return (
  <>
     <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {restaurants.map((h) => (
            <SmallCard key={h._id} h={h} />
          ))}
        </div>
      </div>
  </>
  );
};

export default SearchResult;
