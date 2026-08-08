import React from "react";

const Interests = ({ data, setData, errors }) => {
  const { interests } = data;
  const handleChange = (e, name) => {
    setData((prevState) => ({
      ...prevState,
      interests: e.target.checked
        ? [...prevState.interests, e.target.name]
        : prevState.interests.filter((i) => i !== e.target.name),
    }));
  };
  console.log(data.interests);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={(e) => handleChange(e)}
          />
          Coding
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interests.includes("music")}
            onChange={(e) => handleChange(e)}
          />
          Music
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="movies"
            checked={interests.includes("movies")}
            onChange={(e) => handleChange(e)}
          />
          Movies
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={interests.includes("reading")}
            onChange={(e) => handleChange(e)}
          />
          Reading
        </label>
      </div>
      {errors.interests && <span className="error"> {errors.interests}</span>}
    </div>
  );
};

export default Interests;
