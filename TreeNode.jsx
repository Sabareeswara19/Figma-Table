import { Add, ArrowDropDown, ArrowRight, MoreVert } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

const TreeNode = ({ node, setParent, expandedNodes }) => {
  const [expanded, setExpanded] = useState(expandedNodes[node.name] || false);

  useEffect(() => {
    setExpanded(expandedNodes[node.name] || false);
  }, [expandedNodes, node.name]);

  return (
    <div className="parentNode">
      <div style={{ display: "flex", flexDirection: "row" }}>
        {node.children.length > 0 && (
          <div onClick={() => setExpanded(!expanded)}>
            {expanded ? <ArrowDropDown /> : <ArrowRight />}
          </div>
        )}

        <div className="nodeNameIcon">
          <div className="nodeName">
            <div className="homeRepairIcon"><HomeRepairServiceIcon /></div>
            <div>{node.name}</div>
          </div>

          <div className="nodeHover">
            <Add className="hoverItems" onClick={() => setParent(node)} />
            <MoreVert className="hoverItems" />
          </div>
        </div>
      </div>

      {expanded && node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} setParent={setParent} expandedNodes={expandedNodes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
