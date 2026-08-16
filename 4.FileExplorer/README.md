```
// Recursion + Map + filter

const renameNode = (nodeId, newName) => {
    const update = (list) => {
        return list.map((node) => {
            if(node.id===nodeId){
                return {...node, name: newName};
            }
            if(node.children && node.children.length>0){
                return {...node, children: update(node.children)}
            }
            return node;
        })
    }
    setData(prev => update(prev))
}



const deleteNode = (nodeId) => {
    const update = (list) => {
        return list.filter(node => node.id !== nodeId).map(node => {
            if(node.children && node.children.length>0){
                return {...node, children: update(node.children)}
            }
            return node;
        })
    }
    setData(prev => update(prev));
}



// moveNode("3","6")

const moveNode = (nodeId, targetFolderId) => {
  let movedNode = null;

  // 1. Remove the node from its current location
  const removeNode = (list) => {
    return list
      .filter((node) => {
        if (node.id === nodeId) {
          movedNode = node;
          return false;
        }
        return true;
      })
      .map((node) => {
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: removeNode(node.children),
          };
        }

        return node;
      });
  };

  // 2. Add the removed node to the target folder
  const addNode = (list) => {
    return list.map((node) => {
      if (node.id === targetFolderId) {
        return {
          ...node,
          children: [...node.children, movedNode],
        };
      }

      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: addNode(node.children),
        };
      }

      return node;
    });
  };

  setData((prev) => {
    const updatedTree = removeNode(prev);
    return addNode(updatedTree);
  });
};




// Count the number of Files/Folder

const countFiles = () => {
    let count = 0;
    const solve = (list) =>{
        list.forEach(node => {
            if(!node.isFolder) count++;
            if(node.children && node.children.length>0){
                solve(node.children);
            }
        });
    };

    solve(data);
    return count;
}



// Find the path  ["src", "component", "App.jsx"]

const findPath = (nodeId) => {
    const path = [];
    const solve = (list) => {
        for (const node of list){
            if(node.id===nodeId){
                path.push(node.name);
                return true;
            }
            if(node.children && node.children.length>0){
                path.push(node.name);
                if(solve(node.children)) return true;
                path.pop();
            }
        }
        return false;
    }

    solve(data);
    return path;
}

```
