import React from "react";

const Profile = ({ data, setData }) => {
  const { name, email, age, interests, theme } = data;
  const handleChange = (e, item) => {
    setData((prevState) => ({
      ...prevState,
      [item]: e.target.value,
    }));
  };
  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => handleChange(e, "age")}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
    </div>
  );
};

export default Profile;
