import { useEffect, useState } from "react";
import json from "./data.json";
import "./App.css";

const List = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="file-container">
      {list.map((node, i) => (
        <div key={i} className="file-card">
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? "- " : "+ "}
            </span>
          )}
          <span className="icon">{node.isFolder ? "📂" : "📜"}</span>
          <span>{node.name} </span>
          {isExpanded?.[node.name] && node.children && (
            <List list={node.children} />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(json);
  }, []);

  return (
    <div>
      <h1>File/Folder Explorer</h1>
      <List list={data} />
    </div>
  );
}

export default App;
