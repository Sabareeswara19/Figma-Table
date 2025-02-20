import React, { useState } from "react";
import './TableStyling.css';
import TreeNode from "./TreeNode";

const NestedInputTree = () => {
  const [formData, setFormData] = useState({ name: "", purpose: "", description: "" });
  const [data, setData] = useState([]);
  const [parent, setParent] = useState(null);
  const [search, setSearch] = useState("");
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleObj = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name) return;

    const newNode = { ...formData, children: [] };

    if (parent) {
      const addNestedNode = (nodes) => {
        return nodes.map((node) => {
          if (node === parent) {
            return { ...node, children: [...node.children, newNode] };
          }
          return { ...node, children: addNestedNode(node.children) };
        });
      };
      setData(addNestedNode(data));
    } else {
      setData([...data, newNode]);
    }

    setFormData({ name: "", purpose: "", description: "" });
    setParent(null);
  };

  const searchAndExpand = (nodes, searchTerm, expandedPaths = {}) => {
    let foundInBranch = false;

    const updatedNodes = nodes.map(node => {
      let nodeMatch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      let childMatch = false;

      if (node.children.length > 0) {
        const [childNodes, childFound] = searchAndExpand(node.children, searchTerm, expandedPaths);
        node.children = childNodes;
        childMatch = childFound;
      }

      if (nodeMatch || childMatch) {
        expandedPaths[node.name] = true; // Expand only matching paths
        foundInBranch = true;
      } else {
        expandedPaths[node.name] = false; // Ensure it's collapsed if no match
      }

      return node;
    });

    return [updatedNodes, foundInBranch];
  };

  const handleSearch = () => {
    let expandedPaths = {};
    const [updatedArr, found] = searchAndExpand(data, search, expandedPaths);
    console.log("updatedArr:",updatedArr);
    // if(!search){
    //   alert("Empty field");
    //   setExpandedNodes({});
    // }

    if (found) {
      setExpandedNodes(expandedPaths);
      setData([...updatedArr]);
    } else {
      alert("No match found");
      setExpandedNodes({});
    }
  };

  return (
    <div className="backGroundCont">
      <div className="treeCont">
        <input type="text" placeholder="search" className="assessSearch" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>Search</button>

        <div>
          {data.map((node, index) => (
            <TreeNode key={index} node={node} setParent={setParent} expandedNodes={expandedNodes} />
          ))}
        </div>
      </div>

      <div className="dataInputCont">
        <div className="inputLabel">
          <label>Name</label><span style={{ color: "red" }}>*</span>
          <br />
          <input type="text" value={formData.name} name="name" onChange={handleObj} />
          <br />

          <label>Purpose</label><span style={{ color: "red" }}>*</span>
          <br />
          <input type="text" value={formData.purpose} name="purpose" onChange={handleObj} />
          <br />

          <label>Description</label><span style={{ color: "red" }}>*</span>
          <br />
          <textarea value={formData.description} name="description" onChange={handleObj}></textarea>
          <br />
        </div>
        <br />
        <button className="inputDataSaveBtn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NestedInputTree;
