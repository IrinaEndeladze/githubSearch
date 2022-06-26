import "./home.css";
import { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";

function Home() {
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState([]);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = fetch("https://api.github.com/users")
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [value]);

  const onSearch = (searchText) => {
    console.log("search", searchText);
    setValue(searchText);
  };

  console.log(userData, "jhh");
  return (
    <div className="home-conatiner">
      <nav>
        <div className="container_header">
          <span className="container_header-title">Github's user search</span>
          <div className="icon">
            <span>
              <AiFillGithub />
            </span>
          </div>
        </div>
      </nav>
      <div className="search_input">
        <input
          type="text"
          className="search_input-field"
          placeholder=" Find a user"
          value={value}
          onChange={onChange}
        />
        <button className="search_input-button" onClick={() => onSearch(value)}>
          Search
        </button>
      </div>
      <div className="dropdown">
        {value.length > 0 && <span>Suggestions</span>}
        {userData
          .filter((item) => {
            const searchText = value.toLowerCase();
            const userName = item.login.toLowerCase();
            return (
              searchText &&
              userName.startsWith(searchText) &&
              userName !== searchText
            );
          })
          .slice(0, 10)
          .map((item) => (
            <div
              className="dropdown-container"
              onClick={() => onSearch(item.login)}
              key={item.login}
            >
              <img
                className="dropdown-image"
                src={item.avatar_url}
                alt="login"
              />
              <div
                className="dropdown-users"
                onClick={() => openInNewTab(item.html_url)}
              >
                {item.login}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
