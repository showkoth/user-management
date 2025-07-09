import React from "react";

const UserInfo = ({ name, age, message, error }) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>User Info</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {message && (
        <p style={{ color: "blue", fontStyle: "italic" }}>ℹ️ {message}</p>
      )}
      {error && (
        <p style={{ color: "red", fontStyle: "italic" }}>⚠️ Error: {error}</p>
      )}
    </div>
  );
};

export default UserInfo;
