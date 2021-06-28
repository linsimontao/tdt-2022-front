import React, { useState } from 'react';
import { useCourseData } from '../../Data/useCourseData';
import { Map } from './MapTerrain';
import { Chart } from './Chart';
import { SubTerrain } from './SubTerrain';
import './Terrain.css';

export const Terrain = () => {
    const [subPageActive, setSubPageActive] = useState(true);
    const courseData = useCourseData();
    const [distance, setDistance] = useState(0);
    
    if (!courseData) {
        return <p>Loading</p>;
    }

    return (
        <div className="page">
            <div className="mainpage">
                <Map courseData={courseData} distance={distance} />
                <Chart courseData={courseData} setDistance={setDistance} />
            </div>
            <SubTerrain subPageActive={subPageActive} setSubPageActive={setSubPageActive}/>
        </div>
    );
}
