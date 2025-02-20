import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { context } from "./ParentFigma";
import { useContext } from "react";




const MenuOptions = ({obj,setDsiplayTable,displayTable,setTbData,tbData,current,setNav,nav,navigate}) => {


    const [anchorEl, setAnchorEl] = useState(null);
    const {view,setView}= useContext(context);
    

    const handlePop = (e) => {
      setAnchorEl(e.currentTarget)  
    }

    const handlePopInfo = (obj) => {
        console.log(obj);
        setAnchorEl(null); 
    }

    const hanldeDelete = (obj) => {
        let newData = tbData?.filter(e => e.id!==obj.id);
        setTbData(newData);
        current=newData;
        setDsiplayTable(newData);
        setNav(!nav);
        setAnchorEl(null);
    }
    // console.log("reff:",current);
    // console.log("display:",displayTable);
    // console.log("tbdata:",tbData);

    const handleView = (obj) => {
        setView(obj);
        navigate('/figmaTable/dataShow',{state:{user:obj.name}})
    }

    return(
        <>

                <MoreVertIcon onClick={handlePop} className="more"/>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)} 
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                        sx: {
                            backgroundColor: "rgb(17,23,74)",
                            color:"white",
                        },
                    }}
                >
                    <MenuItem onClick ={() =>handlePopInfo(obj)} ><InfoIcon style={{paddingRight:"0.5rem"}}/>Info</MenuItem>
                    <MenuItem onClick={()=>handleView(obj)} ><VisibilityIcon  style={{paddingRight:"0.5rem"}}/>View</MenuItem>                            
                    <MenuItem onClick={()=>hanldeDelete(obj)} ><RiDeleteBinLine  style={{paddingRight:"0.5rem"}}/>Dele</MenuItem>                            
                </Menu>

        </>
    );
}

export default MenuOptions;

