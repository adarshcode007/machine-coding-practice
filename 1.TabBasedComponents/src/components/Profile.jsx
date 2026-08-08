import React from "react";

const Profile = ({ data, setData, errors }) => {
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
        {errors.name && <span className="error"> {errors.name}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => handleChange(e, "age")}
        />
        {errors.age && <span className="error"> {errors.age}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
        {errors.email && <span className="error"> {errors.email}</span>}
      </div>
    </div>
  );
};

export default Profile;
