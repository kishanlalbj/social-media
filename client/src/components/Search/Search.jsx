import { useEffect, useRef, useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

const Search = ({ className, options, onSearch }) => {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClick = (e) => {
    e.stopPropagation;
    setShowOptions(false);
  };

  useEffect(() => {
    return () => {
      setShowOptions(false);
    };
  }, []);

  return (
    <div className={`search-container ${className}`}>
      <textarea
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
        // onBlur={() => setShowOptions(false)}
        className="search-input"
        rows={1}
        placeholder="Search Users"
      ></textarea>

      {showOptions && options?.length > 0 && (
        <div className="options-container">
          <ul className="options-list">
            {options.map((opt) => (
              <Link
                key={opt.id}
                to={`/profile/${opt.id}`}
                className="option"
                onClick={handleClick}
              >
                <li>{opt.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
