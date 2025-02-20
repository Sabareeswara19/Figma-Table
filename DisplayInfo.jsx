import React, { useContext } from "react";
import { context } from "./ParentFigma";
import { useLocation } from "react-router-dom";


const DisplayInfo =  () => {
    const location = useLocation();
    const {view,setView} = useContext(context);
    const{user} = location.state || {};
    
    return(
        <>
            <h3>Welcome {user}</h3>
           <p><b>Name:</b>{view.name}</p>
           <p><b>Purpose:</b>{view.purpose}</p>
           <p><b>Description:</b>{view.description}</p>
           <p><b>Created On:</b>{view.date}</p>
           <p><b>Status:</b> {view.checked ? "True" : "false"}</p>
        </>
    );
}

export default DisplayInfo;