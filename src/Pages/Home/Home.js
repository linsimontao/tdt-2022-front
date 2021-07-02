import React, { useState } from "react";
import { SubHome } from "./SubHome";
import { SubLive } from "./SubLive";
import { Map } from './MapCourse';
import './MapCourse.css';
import '../Pages.css';
export const Home = ({ sub }) => {
    const [subHomePageActive, setSubHomePageActive] = useState(true);
    const [activeCourseId, setActiveCourseId] = useState(0);
    
    const [subLivePageActive, setSubLivePageActive] = useState(true);
    
    return (
        <div className="page">
            <div className="mainpage">
                <Map />
            </div>
            {sub === 'home' ?
                <SubHome subPageActive={subHomePageActive} setSubPageActive={setSubHomePageActive} activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId} /> :
                <SubLive subPageActive={subLivePageActive} setSubPageActive={setSubLivePageActive} />
            }
        </div>
    );
}