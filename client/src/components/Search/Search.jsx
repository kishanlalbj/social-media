import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = ({ className, options, onSearch }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [q, setQ] = useState("");

  const handleChange = (e) => {
    setQ(e.target.value);
    onSearch(e.target.value);
  };

  const handleClick = (id) => {
    navigate(`/profile/${id}`);
    setQ("");
    setShowOptions(false);
  };

  const handleBlur = () => {
    setQ("");
  };

  useEffect(() => {
    return () => {
      setShowOptions(false);
    };
  }, []);

  return (
    <div className={`search-container ${className}`}>
      <input
        type="text"
        value={q}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
        className="search-input"
        placeholder="Search Users"
        autoComplete="off"
        // onBlur={handleBlur}
      ></input>

      {q && showOptions && options?.length > 0 && (
        <div className="options-container">
          <ul className="options-list">
            {options.map((opt) => (
              <li
                key={opt.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(opt.id);
                }}
                className="option"
              >
                {opt.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
