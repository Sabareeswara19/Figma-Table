import React, { useCallback, useEffect, useRef, useState } from "react";
import data from "./Data";
import './TableStyling.css';
import SearchIcon from '@mui/icons-material/Search';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosCheckbox } from "react-icons/io";
import MenuOptions from "./MenuOptions";
import DetailOptions from "./DetailOptions";
import { useNavigate } from "react-router-dom";
// import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';

const DisplayComponent = () => {

    const[tbData,setTbData] = useState(data);
    const reff = useRef(data);
    const focusRef = useRef(null);
    const[displayTable,setDsiplayTable]=useState();
    const[input,setInput] = useState({name:true,purpose:true,description:true,date:true})
    const[headCheck,setHeadCheck]= useState("unselected");

    const navigate = useNavigate();

    const[sortName,setSortName] = useState(false);
    const[sortPurpose,setSortPurpose]=useState(false);
    const[sortDescription,setSortDescription]=useState(false);

    const[nav,setNav] = useState(false);
    const[options,setOptions]= useState({name:true,purpose:true,description:true,date:true});
        
    // showdetail states
    const [showName,setShowName]=useState(true);
    const [showPurpose,setShowPurpose]=useState(true);
    const [showDescription,setShowDescritpion]=useState(true);
    const [showDate,setShowDate]=useState(true);

    
    //pagination states 
    const[pageNum,setPageNum] = useState(1);
    const[noOfItems,setNoOfItems] = useState(10);
    let noOfPages = Math.ceil(tbData.length/noOfItems);
   

    const toggleInput = (key) => { 
        setInput((prev) => ({...prev, [key]:!prev[key]}));
    } 

    const handleSearchBlur = (obj) => {
        if(!obj.event){
            setInput((prev) => ({...prev,[obj.key]:true}));
        }else{
            setInput((prev) => ({...prev,[obj.key]:false}));
        }
    }

    useEffect(() => {
        if(focusRef.current){
            focusRef.current.focus()
        }
    },[input]);

    useEffect(() => {
        // alert("Calling useEffect");
        reff.current = tbData;
       let lastItemIndex = pageNum * noOfItems;
       let  firstItemIndex = lastItemIndex - noOfItems;
        let a = tbData.slice(firstItemIndex,lastItemIndex);
        setDsiplayTable(a);

    },[pageNum,noOfItems,nav]) 
    

    const toPreviousPage = (pageNum) => {
        setPageNum(pageNum-1);
    }

    const toNextPage = (pageNum) => {
        setPageNum(pageNum+1);
    }

    const handleNoOfItems = (e) => {
        setNoOfItems(e.target.value);
    }


    const nameMatch= (e) => {
        if(e.key==="Enter" && e.target.value.length>2)
        {
            let a= reff.current?.filter(obj=> obj.name.includes(e.target.value));
            setDsiplayTable(a); 
        }
        else
        {
            setDsiplayTable(tbData);
            setNav(!nav);
        }
    }


    const purposeMatch= (e) => {
        if(e.key==="Enter" && e.target.value.length>2)
            {

                let a= reff.current?.filter(obj=> obj.purpose.includes(e.target.value));
                setDsiplayTable(a); 
            }
        else
        {
            setDsiplayTable(tbData);
            setNav(!nav);
        }  
    }

    const descriptionMatch= (e) => {
        if(e.key==="Enter" && e.target.value.length>2)
            {
                let a= reff.current?.filter(obj=> obj.description.includes(e.target.value));
                setDsiplayTable(a); 
            }
            else
            {

                setDsiplayTable(tbData);
                setNav(!nav);
            }   
    }

    const dateMatch = (e) => {
        if(e.key==="Enter" && e.target.value.length>2)
            {
                let a= reff.current?.filter(obj=> obj.date.includes(e.target.value));
                setDsiplayTable(a);
            }
            else
            {

                setDsiplayTable(tbData);
                setNav(!nav);
            }
    }

    const hanldeCheck = (obj) => {
        // console.log(obj);
        const newData = tbData?.map(e => 
        {
            if(e.id===obj.id)
            {
                e.checked=!e.checked;
            }
            return e;
        });
        setDsiplayTable(newData);
        setTbData(newData);

        let val = tbData.find(e => e.checked===true)
        if(val)
            {setHeadCheck("selected");}
        else{
            setHeadCheck("unselected");
        }
        
        setNav(!nav);  
    }




const handleSortName =  () => {
        setSortName(!sortName);
        if(sortName){
           
            const ascenSorted = tbData?.sort((a,b) => b.name.localeCompare(a.name));
            setTbData(ascenSorted);
        }
        else{
            const descenSorted = tbData?.sort((a,b) => a.name.localeCompare(b.name));
            setTbData(descenSorted);
        }

        setNav(!nav);

    }

    const handleSortPurpose = () => {
        setSortPurpose(!sortPurpose);
            if(sortPurpose)
            {            
            const ascenSorted = tbData?.sort((a,b) => b.purpose.localeCompare(a.purpose));
            setTbData(ascenSorted);
            }
            else{
            const descenSorted = tbData?.sort((a,b) => a.purpose.localeCompare(b.purpose));
            setTbData(descenSorted);
            }
            setNav(!nav);
        }

        const handleSortDescription = () => {
            setSortDescription(!sortDescription);
                if(sortDescription)
                {            
                const ascenSorted = tbData?.sort((a,b) => b.description.localeCompare(a.description));
                setTbData(ascenSorted);
                }
                else{
                const descenSorted = tbData?.sort((a,b) => a.description.localeCompare(b.description));
                setTbData(descenSorted);
                }

            setNav(!nav);

    
            }


    const handleOmniDelete = () => {
        let newData = tbData?.filter(e => (e.checked===false));
        setTbData(newData);
        setDsiplayTable(newData);
        reff.current = newData;
        setHeadCheck(!headCheck);
        setNav(!nav);
    }

 
    const handleAllSelect = () => {
        // alert("allselect calling");

        let lastItemIndex = pageNum * noOfItems;
       let  firstItemIndex = lastItemIndex - noOfItems;

        let a = tbData?.map((e,i) => {
            if(i>=firstItemIndex && i<lastItemIndex)
            {
                e.checked=true;
                return e;
            }
            else{
                return e;
            }
        } )

        setTbData(a);
        // reff.current = tbData;
        setNav(!nav);

        
        setHeadCheck("allselected")
        console.log(displayTable);
        console.log(tbData);
        console.log(reff.current);
    }
    // console.log(tbData);
    // console.log(reff.current);
    // console.log(displayTable);


    const allSelectUndo = () => {
        // alert("Undo allselect calling");
        let lastItemIndex = pageNum * noOfItems;
       let  firstItemIndex = lastItemIndex - noOfItems; 
        let a = tbData?.map((e,i) => {
            if(i>=firstItemIndex && i<lastItemIndex)
            {
                e.checked=false; 
                return e;

            }
            return e;

        } )

        setTbData(a);
        reff.current = tbData;
        setNav(!nav);
        setHeadCheck("unselected");
    }


    return(
        <>


        <div className="mainOuterCont">

            <div className="assessParentCont">
            {/* navigate('/figmaTable/dataShow',{state:{user:obj.name}}) */}
                <button onClick={() => navigate('/figmaTable/assessment')}>Assessment</button>
            </div>
                <div className="figmaTableoverAll">

                    {(headCheck==="selected" || headCheck==="allselected") && <h2 style={{color:"White",marginTop:"5vh"}}>
                            Actions
                            <RiDeleteBinLine  className="deleteIcon" onClick={handleOmniDelete}/>
                        </h2> 
                    }

                    <div id="displayCont">
                    {/* <button>Assessment</button> */}

                        <table>

                            <thead>
                                
                                    <th style={{width:"5vw"}}>
                                        {
                
                                            headCheck==="allselected" ?  <div> <IoIosCheckbox className="boxType" style={{color:"yellow"}} onClick={allSelectUndo} /> </div>
                                            :( headCheck==="selected") ?<div>  <MdOutlineIndeterminateCheckBox className="boxType" style={{color:"yellow"}} /> </div> 
                                            : <MdOutlineCheckBoxOutlineBlank className="boxType" onClick={handleAllSelect}/> 
                                        }
                                    </th>   

                                {options.name ?           
                                    <th style={{width:"15vw"}}>
                                    { 
                                        input.name ? <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div>Name
                                        {
                                            sortName ? <IoIosArrowUp onClick={handleSortName} /> :  <IoIosArrowDown onClick={handleSortName}/>
                                            
                                        }  </div>
                                        <div style={{float:"right"}}>{<SearchIcon onClick={() => toggleInput("name")} />}</div>

                                        </div>: <input type="text" style={{float:"left"}} ref={focusRef} onKeyDown={nameMatch} onBlur={(e) => handleSearchBlur({event:e.target.value,key:"name"})}/>
                                    } 
                                    </th> :null
                                }

                                {options.purpose ?
                                    <th style={{width:"28vw"}}>
                                    { 
                                        input.purpose ? <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div>Purpose 
                                        {
                                            sortPurpose ? <IoIosArrowUp onClick={handleSortPurpose} /> :  <IoIosArrowDown onClick={handleSortPurpose}/> 
                                        }</div>
                                        <div style={{float:"right"}}>{<SearchIcon onClick={() => toggleInput("purpose")}/>}</div>

                                        </div>  : <input type="text" style={{float:"left"}} ref={focusRef}  onKeyDown={purposeMatch} onBlur={(e) => handleSearchBlur({event:e.target.value,key:"purpose"})}  />}
                                    </th> :null
                                }
                                
                                {options.description ?   
                                <th style={{width:"28vw"}}>
                                        { 
                                            input.description ? <div style={{display:"flex",justifyContent:"space-between"}}>
                                            <div>
                                                Description 
                                                {
                                                    sortDescription ? <IoIosArrowUp onClick={handleSortDescription} /> :  <IoIosArrowDown onClick={handleSortDescription}/> 
                                                }
                                            </div>
                                            <div style={{float:"right"}}>{<SearchIcon onClick={() => toggleInput("description")}/>}</div>

                                            </div> 
                                            :<input type="text" style={{float:"left"}} ref={focusRef} onKeyDown={descriptionMatch} onBlur={(e) => handleSearchBlur({event:e.target.value,key:"description"})}/>}
                                    </th> :null
                                }

                                {options.date ?
                                    <th style={{width:"10vw"}}>
                                    { 
                                    input.date ?   <div style={{display:"flex",justifyContent:"space-between"}}>
                                        Date Created
                                        <div style={{float:"right"}}>{<SearchIcon onClick={() => toggleInput("date")}/>}</div>

                                        </div> 
                                        
                                        : <input type="text" ref={focusRef}  onKeyDown={dateMatch} onBlur={(e) => handleSearchBlur({event:e.target.value,key:"date"})} /> }
                                    </th>   :null
                                }
                                    <th style={{width:"1.5vw",fontSize:"32px",display:"flex",float:"right",padding:"0"}}><DetailOptions  
                                        showDate={showDate} showName={showName} showPurpose={showPurpose} showDescription={showDescription}
                                        setShowName={setShowName} setShowDate={setShowDate} setShowDescritpion={setShowDescritpion} setShowPurpose={setShowPurpose}
                                        options= {options} setOptions = {setOptions}
                                        /></th>
                            
                                
                            </thead>



                            <tbody>
                                {
                                displayTable?.map((obj) =>(
                                    <tr>
                                    <td> {
                                        obj.checked ? <IoIosCheckboxOutline  className="boxType" onClick={() => hanldeCheck(obj)} style={{color:"yellow"}}/>
                                            :<MdOutlineCheckBoxOutlineBlank  className="boxType" onClick={() => hanldeCheck(obj)}/>
                                        }
                                        </td>
                                        {options.name ? <td>{obj.name}</td> :null }
                                        {options.purpose ? <td>{obj.purpose}</td> :null }
                                        {options.description ? <td>{obj.description}</td> :null }
                                        {options.date ? <td>{obj.date}</td> :null }
                                        <td className="hover-icon">
                                            <MenuOptions obj={obj} setDsiplayTable={setDsiplayTable} displayTable={displayTable} 
                                        current = {reff.current} tbData={tbData} setTbData={setTbData} setNav={setNav} nav={nav} navigate={navigate}/>
                                            {/* <button onClick={()=>console.log(obj)}>Click</button> */}
                                        </td>
                                    </tr>))
                                }
                            </tbody>
                        </table> 

                        <div className="footer">
                            <div>
                                <select for="numbers" onChange={handleNoOfItems}>
                                    <option value="10">10</option>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="20">20</option>
                                    <option value={tbData.length}>30</option>
                                </select>
                            </div>
                            
                            <div>
                                {pageNum}-{noOfPages}
                                <button className="arrowleft" onClick ={() => toPreviousPage(pageNum)} disabled={pageNum===1} style={{backgroundColor: pageNum===1 ? "rgba(54,59,102,0.1)":"rgb(45,50,95)"}}> {"<"}</button>
                                <button className="arrowleft" onClick={() => toNextPage(pageNum)} disabled={pageNum===noOfPages} style={{backgroundColor: pageNum===noOfPages ? "rgba(45,50,95,0.1)":"rgba(54,59,102)"}}>{">"}</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </> 
    );
}

export default DisplayComponent;



// sprting methods
 // const[sortName,setSortName] = useState(false);
    // const[sortPurpose,setSortPurpose]=useState(false);
    // const[sortDescription,setSortDescription]=useState(false);

    // const handleSortName =  () => {
    //     setSortName(!sortName);
    //     if(sortName){
           
    //         const ascenSorted = copyData?.sort((a,b) => b.name.localeCompare(a.name));
    //         setTbData(ascenSorted);
    //     }
    //     else{
    //         const descenSorted = copyData?.sort((a,b) => a.name.localeCompare(b.name));
    //         setTbData(descenSorted);
    //     }
    // }

    // const handleSortPurpose = () => {
    //     setSortPurpose(!sortPurpose);
    //         if(sortPurpose)
    //         {            
    //         const ascenSorted = copyData?.sort((a,b) => b.purpose.localeCompare(a.purpose));
    //         setTbData(ascenSorted);
    //         }
    //         else{
    //         const descenSorted = copyData?.sort((a,b) => a.purpose.localeCompare(b.purpose));
    //         setTbData(descenSorted);
    //         }

    //     }

    //     const handleSortDescription = () => {
    //         setSortDescription(!sortDescription);
    //             if(sortDescription)
    //             {            
    //             const ascenSorted = copyData?.sort((a,b) => b.description.localeCompare(a.description));
    //             setTbData(ascenSorted);
    //             }
    //             else{
    //             const descenSorted = copyData?.sort((a,b) => a.description.localeCompare(b.description));
    //             setTbData(descenSorted);
    //             }
    
    //         }



    // toggle input
    // const nameSearch=()=> {
    //     setNameInput(!nameInput);
    // }

    // const purposeSearch = () => {
    //     setPurposeInput(!purposeInput);
    // }

    // const descriptionSearch = () => {
    //     setDescriptionInput(!descriptionInput);
    // }

    // const dateSearch = () => {
    //     setDateInput(!dateInput);
    // }

    
    // const matchField = (e,key) => {
    //     if(e.target.value.length<2)
    //     {
    //         setDsiplayTable(tbData);
    //     }
    //     else{
    //         const filteredData = tbData.filter((obj) => obj[key].includes(e.target.value));
    //         setDsiplayTable(filteredData);
    //     }
    //     setNav(!nav);
    // }



        // const [up, setUp] = useState({
    //     name: true,
    //     commonName: true,
    //     description: true,
    // });

    // const handleSorting = (field) => {
    //     setUp((prevState) => ({
    //         ...prevState,
    //         [field.name]: !prevState[field.name],
    //     }));
    //     const sortedData = [...tableData].sort((a, b) => {
    //         if (field.order === "Ascending") {
    //             return a[field.name].localeCompare(b[field.name]);
    //         } else {
    //             return b[field.name].localeCompare(a[field.name]);
    //         }
    //     });
    //     setCopyData(sortedData);
    //     // setTableData(sortedData);
    //     setPageNation(!pageNation);
    // }
    