import { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

const TabForm = () => {
  const [data, setData] = useState({
    name: "Akshay",
    age: "29",
    email: "akshay@gmail.com",
    interests: ["coding", "movies"],
    theme: "dark",
  });

  const [errors, setErrors] = useState({});

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name.length < 2) {
          err.name = "Name is required and should be atleast 2 characters long";
        }
        if (!data.age || isNaN(data.age)) {
          err.age = "Age is required and should be a number";
        } else if (data.age < 18 || data.age > 100) {
          err.age = "Age should be between 18 and 100";
        }
        if (!data.email || !data.email.includes("@")) {
          err.email = "Email should be valid email address";
        }
        setErrors(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (!data.interests || data.interests.length === 0) {
          err.interests = "Please select atleast one interest";
        }
        setErrors(err);
        return err.interests ? false : true;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleSubmitClick = () => {
    // Make API call
    console.log("Form Submitted: ", data.name);

    const interests = data.interests.join(", ");
    const message = `Name: ${data.name}\nAge: ${data.age}\nEmail: ${data.email}\nInterests: ${interests}\nTheme: ${data.theme}`;

    alert(`Form Submitted:\n${message}`);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((t, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => tabs[activeTab].validate() && setActiveTab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrevClick}>prev</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
