import React, { useState, useEffect } from "react";
import "./App.css";
import UserInfo from "./components/UserInfo";
import { getParsedData } from "./services/dataService";

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getParsedData();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <h1>Feature 4 Kickoff</h1>
        <div>Loading data from Back4App...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h1>Feature 4 Kickoff</h1>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Feature 4 Kickoff</h1>

      {userData && userData.length > 0 ? (
        <div>
          <h2>Users from Back4App:</h2>
          {userData.map((user, index) => (
            <UserInfo
              key={user.id || index}
              name={user.name}
              age={user.age}
              message={user.message}
              error={user.error}
            />
          ))}
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}

export default App;
