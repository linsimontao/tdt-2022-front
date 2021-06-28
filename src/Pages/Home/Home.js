import React, { useState } from "react";
import { SubHome } from "./SubHome";
import { Map } from './MapCourse';
import './MapCourse.css';
import '../Pages.css';
export const Home = () => {
    const [subPageActive, setSubPageActive] = useState(true);
    return ( 
        <div className="page">
            <div className="mainpage">
                <Map />
            </div>
            <SubHome subPageActive={subPageActive} setSubPageActive={setSubPageActive}/>
        </div>
     );
}