import React, { useState, useEffect } from "react";
import { getParsedData } from "../services/dataService";

const UserInfo = () => {
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
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div>Loading data from Back4App...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <div>Error: {error}</div>
        <button 
          onClick={fetchData}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {userData && userData.length > 0 ? (
        <div>
          <h3>Users from Back4App:</h3>
          {userData.map((user, index) => (
            <div
              key={user.id || index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Age:</strong> {user.age}</p>
              {user.message && (
                <p style={{ color: "blue", fontStyle: "italic" }}>ℹ️ {user.message}</p>
              )}
              {user.error && (
                <p style={{ color: "red", fontStyle: "italic" }}>⚠️ Error: {user.error}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          No user data available
        </div>
      )}
    </div>
  );
};

export default UserInfo;
