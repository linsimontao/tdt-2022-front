import React, { useState } from 'react';
import { lineString } from '@turf/turf';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import { RidersData } from '../../Data/RidersData';
import { Map } from './MapLiveRiders';

export const Riders = () => {
    const courseLinestring = lineString(
        course65.features.map(d => d.geometry.coordinates)
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
        </div>
    );
}
