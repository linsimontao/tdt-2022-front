import React, { useState } from "react";
import { SubHome } from "./SubHome";
import { SubLive } from "./SubLive";
import { SubInfo } from "./SubInfo";
import { SubTerrain } from "./SubTerrain";
import { Map } from './MapCourse';
import { Chart } from '../Common/Chart';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import './MapCourse.css';
import './Terrain.css';
import '../Pages.css';
export const Home = ({ sub }) => {
    const [subHomePageActive, setSubHomePageActive] = useState(true);
    const [activeCourseId, setActiveCourseId] = useState(0);
    const [liveType, setLiveType] = useState('video');
    const [subLivePageActive, setSubLivePageActive] = useState(true);
    const [subInfoPageActive, setSubInfoPageActive] = useState(true);
    const [subTerrainPageActive, setSubTerrainPageActive] = useState(true);
    const [distance, setDistance] = useState(0);
    const [activePID, setActivePID] = useState(10);
    
    const showSubPanel = () => {
        switch (sub) {
            case 'home':
                return <SubHome subPageActive={subHomePageActive} setSubPageActive={setSubHomePageActive} activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId} activePID={activePID} setActivePID={setActivePID} />;
            case 'live':
                return <SubLive subPageActive={subLivePageActive} setSubPageActive={setSubLivePageActive} liveType={liveType} setLiveType={setLiveType}/>
            case 'info':
                return <SubInfo subPageActive={subInfoPageActive} setSubPageActive={setSubInfoPageActive} />;
            case 'terrain':
                return <SubTerrain subPageActive={subTerrainPageActive} setSubPageActive={setSubTerrainPageActive} activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId} />;
        }
    }

    return (
        <div className="page">
            <div className="mainpage">
                <Map sub={sub} activeCourseId={activeCourseId} courseData={activeCourseId === 0? course65: course100} distance={distance} activePID={activePID} setActivePID={setActivePID} />
                { sub === 'terrain' ?
                    <Chart courseData={activeCourseId === 0? course65: course100} setDistance={setDistance} />:
                    <></>
                }
            </div>
            {showSubPanel()}
        </div>
    );
}