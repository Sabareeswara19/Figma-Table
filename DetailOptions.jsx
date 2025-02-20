import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { PiColumnsPlusRightLight } from "react-icons/pi";
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';

const DetailOptions = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const{showName, showPurpose, showDescription,showDate,setShowName,setShowPurpose,setShowDescritpion,
        setShowDate, options,setOptions} = props

    const handlePop = (e) => {
        setAnchorEl(e.currentTarget)  
    }

    const handleNameShow = () => {
        setShowName(!showName);
    }

    const handlePurposeShow = () => {
        setShowPurpose(!showPurpose);
    }

    const handleDescriptionShow = () => {
        setShowDescritpion(!showDescription);
    }

    const handleDateShow = () => {
        setShowDate(!showDate);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleApply = () => {

        setOptions({name:showName,purpose:showPurpose,description:showDescription,date:showDate});
        setAnchorEl(null)
    }


    return(
        <>
        <PiColumnsPlusRightLight onClick= {handlePop}/>
        <Menu 
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} 
            onClose={() => setAnchorEl(null)}
            PaperProps={{
                sx: {
                    backgroundColor: "rgb(17,23,74)",
                    color:"white",
                    height:"200px",
                    width:"200px",
                },
            }}
        >
            <MenuItem style={{display:"flex",justifyContent:"space-between"}}>
            Name 
            {
                showName ? <ToggleOnRoundedIcon onClick={handleNameShow}/>  : <ToggleOffTwoToneIcon onClick={handleNameShow}/>
            }
            </MenuItem> 

            <MenuItem style={{display:"flex",justifyContent:"space-between"}}>
            Purpose
            {
                showPurpose ? <ToggleOnRoundedIcon onClick={handlePurposeShow}/>  : <ToggleOffTwoToneIcon onClick={handlePurposeShow}/>
            }
            </MenuItem>  

            <MenuItem style={{display:"flex",justifyContent:"space-between"}}>
            Description 
            {
                showDescription ? <ToggleOnRoundedIcon onClick={handleDescriptionShow}/>  : <ToggleOffTwoToneIcon onClick={handleDescriptionShow}/>
            }
            </MenuItem>

            <MenuItem style={{display:"flex",justifyContent:"space-between"}}>
            Date
            {
                showDate ? <ToggleOnRoundedIcon onClick={handleDateShow}/>  : <ToggleOffTwoToneIcon onClick={handleDateShow}/>
            }
            </MenuItem>  

            <div className="detailBtns"> 
                <button onClick={handleApply}>Apply</button>
                <button onClick={handleClose}>Close</button>
            </div>
        
        </Menu>
        </>
    )

}

export default DetailOptions;