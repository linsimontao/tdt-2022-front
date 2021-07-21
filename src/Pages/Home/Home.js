import React, { useState } from "react";
import { Map } from './MapCourse';
import { Chart } from '../Common/Chart';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import './MapCourse.css';
import './Terrain.css';
import '../Pages.css';
export const Home = ({ sub }) => {
    const [activeCourseId, setActiveCourseId] = useState(0);
    const [distance, setDistance] = useState(0);
    const [activePID, setActivePID] = useState(10);

    return (
        <div className="page">
            <Map activeCourseId={activeCourseId} courseData={activeCourseId === 0 ? course65 : course100} distance={distance} activePID={activePID} setActivePID={setActivePID} />
            {/* { sub === 'terrain' ?
                    <Chart courseData={activeCourseId === 0? course65: course100} setDistance={setDistance} />:
                    <></>
                } */}
        </div>
    );
}