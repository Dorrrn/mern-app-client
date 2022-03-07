import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserCards from "./UserCards";

export default function Searchbar(props) {

const [searchTerm, setSearchTerm] = useState();
const [searchResults, setSearchResults] = useState ([]);

const handleSearch = (e) => {
    setSearchTerm(e.target.value);
}

useEffect (() => {
    const results = props.users.filter((elm) => {
elm.name.toLowerCase().includes(searchTerm)
    });
    setSearchResults(results)
}, [searchTerm])


  return (
    <div className="Search">
      <form>
        <input
          type="text"
          placeholder="search ... "
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>

      {searchResults.length > 0 ? (
        <UserCards
          users={searchResults}
          sliceStart="0"
          sliceEnd={searchResults.length}
        />
      ) : (
        <UserCards
          users={props.users}
          sliceStart="0"
          sliceEnd={props.users.length}
        />
      )}
    </div>
  );
}
