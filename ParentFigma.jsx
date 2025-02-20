import React, { createContext, useState } from "react";
import DisplayComponent from "./DisplayComponent";
import DisplayInfo from "./DisplayInfo";
import { HashRouter, Route, Routes } from "react-router-dom";
import NestedInputTree from "./NestedInputTree";

export const context = createContext();
const ParentFigma = () => {
    const[view,setView] = useState();

    return(
        <context.Provider value = {{view,setView}}>
            <HashRouter>
                <Routes>
                    <Route
                        path='/figmaTable'
                        element={ <DisplayComponent /> }  />
                    <Route path='/figmaTable/dataShow' element={<DisplayInfo />} />
                    <Route path='/figmaTable/assessment' element ={ <NestedInputTree /> } />
                </Routes>
            </HashRouter>
        </context.Provider>
    );
}

export default ParentFigma;