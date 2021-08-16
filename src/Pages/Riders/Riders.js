import React, { useState } from 'react';
import { lineString } from '@turf/turf';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import { RidersData } from '../../Data/RidersData';
import { MapRiders } from './MapLiveRiders';
import { Ohen } from '../Common/Ohen';
import { RIDER } from '../../constant/Constant';

import '../Pages.css';

export const Riders = ({ active, setActive }) => {
    if (setActive) {
        setActive(RIDER);
    }
    const courseLinestring = lineString(
        course65.features.map(d => d.geometry.coordinates)
    );
    const riders = RidersData(courseLinestring);
    if (!riders) {
        return <p>Loading</p>;
    }
    return (
        <div className="page">
            <MapRiders courseLinestring={courseLinestring} riders={riders} />
            <Ohen />
        </div>

    );
}
