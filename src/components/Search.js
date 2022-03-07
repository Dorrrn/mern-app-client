import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search(props) {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useSearchParams();
 
  const filter = (e) => {
    e.preventDefault();
    setQuery({search: e.target.value});
    setSearchInput(e.target.value);
    props.filterUsers(searchInput);
  };

  return (
    <div className="Search">
      <form>
        <input
          type="text"
          placeholder="search ... "
          value={searchInput}
          onChange={filter}
        />
      </form>
    </div>
  );
}
