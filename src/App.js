import React, { useState } from "react";
import HomeShowcase from "./components/HomeShowcase";
import SearchForm from "./components/SearchForm";
import ErrorMessage from "./components/ErrorMessage";
import Followers from "./components/Followers";
import getFollowersOfUser from "./components/Api";
import "./App.css";

const App = () => {
  let [followers, setFollowers] = useState({});
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFollowers = async () => {
    if (!userName) return false;
    setLoading(true);
    setError("");
    try {
      followers = await getFollowersOfUser(userName);
      setFollowers(followers);
      setLoading(false);
      console.log(followers);
    } catch (err) {
      setFollowers({});
      setError(err.message.split(":")[1]);
    }
  };

  return (
    <div className="container">
      <HomeShowcase />
      <SearchForm
        handleChange={(e) => setUserName(e.target.value)}
        value={userName}
        searchHandler={getFollowers}
      />

      <div className="response__container">
        {!loading && followers.length > 0 ? (
          <Followers items={followers} />
        ) : error ? (
          <ErrorMessage errMessage={error} />
        ) : null}
      </div>
    </div>
  );
};

export default App;
