// Nested File Structure
// Expand and Collapse folders
// Add/Remove File/Folder

import { useEffect, useState } from "react";
import json from "./data.json";
import "./App.css";

const List = ({ list, addNodeToList, deleteNodeFromList, addFileToList }) => {
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
          {node?.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              <img
                src="https://img.icons8.com/fluent-systems-filled/1200/add-folder.jpg"
                alt="icon"
                className="icon"
              />
            </span>
          )}
          {node?.isFolder && (
            <span onClick={() => addFileToList(node.id)}>
              <img
                src="https://png.pngtree.com/png-vector/20250610/ourlarge/pngtree-add-file-upload-icon-file-vector-png-image_16507187.png"
                alt="icon"
                className="icon"
              />
            </span>
          )}
          <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyq46y6E0jvPWhtKiKG6_eriUrU3EvoeZadNjv_h37RQ&s"
              alt="icon"
              className="icon"
            />
          </span>
          {isExpanded?.[node.name] && node.children && (
            <List
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
              addFileToList={addFileToList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter Name");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  const addFileToList = (itemId) => {
    const name = prompt("Enter File Name");
    if (!name) return;

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === itemId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now().toString(), name: name, isFolder: false },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    setData((prev) => updateTree(prev));
  };

  useEffect(() => {
    setData(json);
  }, []);

  return (
    <div>
      <h1>File/Folder Explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
        addFileToList={addFileToList}
      />
    </div>
  );
}

export default App;
