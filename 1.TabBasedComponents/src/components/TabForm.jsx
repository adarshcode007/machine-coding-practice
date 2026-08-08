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
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interests",
      component: Interests,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;
  return (
    <div>
      <div className="heading-container">
        {tabs.map((t, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => setActiveTab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} />
      </div>
      <div>
        {activeTab > 0 && <button>prev</button>}
        {activeTab < tabs.length - 1 && <button>next</button>}
        {activeTab === tabs.length - 1 && <button>Submit</button>}
      </div>
    </div>
  );
};

export default TabForm;
