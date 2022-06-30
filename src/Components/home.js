import "./home.css";
import React, { useEffect, useState, useRef } from "react";
import { AiFillGithub, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

function Home() {
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
  }, []);

  const onSearch = (searchText) => {
    setValue(searchText);
    const filtered = userData.filter((item) => {
      const searchText = value.toLowerCase();
      const userName = item.login.toLowerCase();
      return (
        searchText &&
        userName.startsWith(searchText) &&
        userName !== searchText - 1
      );
    });
    setFilteredData(filtered);
  };

  const showData = value.length === 0 ? userData : filteredData;

  const onChange = (e) => {
    setValue(e.target.value);
    setShow(true);
  };

  useEffect(() => {
    onSearch(value);
  }, [value]);

  const openGithubPage = (searchText, url) => {
    setValue(searchText);
    openInNewTab(url);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setShow(false);
    }
  };

  return (
    <div className="home-conatiner">
      <nav>
        <div className="container_header">
          <span className="icon">
            <AiFillGithub />
          </span>
          <span className="container_header-title">Github's user search</span>
        </div>
      </nav>
      <div ref={wrapperRef} className="search-container">
        <div className="search-inner">
          <div className="search-wrapper">
            {" "}
            <AiOutlineSearch />
            <input
              type="text"
              placeholder="Find a user"
              value={value}
              onChange={onChange}
              onClick={() => setShow(!show)}
            />
            <AiOutlineClose onClick={() => setValue("")} />
          </div>
          {show && (
            <>
              <span className="search-suggestion">Suggestion</span>
              <div className="dropdown">
                {showData.map((item) => (
                  <div
                    className="dropdown-content"
                    onClick={() => openGithubPage(item.login, item.html_url)}
                    key={item.login}
                    tabIndex="0"
                  >
                    <img
                      className="dropdown-image"
                      src={item.avatar_url}
                      alt="login"
                    />
                    <div className="dropdown-users">{item.login}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
