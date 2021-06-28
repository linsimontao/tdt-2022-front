import React, { useState } from 'react';
import { lineString } from '@turf/turf';
import { useCourseData } from '../../Data/useCourseData';
import { RidersData } from '../../Data/RidersData';
import { Map } from './MapLiveRiders';
import { SubRiders } from './SubRiders';
import './RidersMap.css';

export const Riders = () => {
    const [subPageActive, setSubPageActive] = useState(true);
    const course = useCourseData();
    if (!course) {
        return <p>Loading</p>;
    }

    const courseLinestring = lineString(
        course.map(d => d.coordinates)
    );
    const riders = RidersData(courseLinestring);
    if (!riders) {
        return <p>Loading</p>;
    }
    return (
        <div className="page">
            <div className="mainpage">
                <Map courseLinestring={courseLinestring} riders={riders} />
            </div>
            <SubRiders subPageActive={subPageActive} setSubPageActive={setSubPageActive}/>
        </div>
    );
}
