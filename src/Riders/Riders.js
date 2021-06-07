import React from 'react';
import { useCourseData } from '../Data/useCourseData';
import { RidersData } from '../Data/RidersData';
import { Map } from '../Map/MapLiveRiders';
import { lineString } from '@turf/turf';

const Riders = () => {
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
        <React.Fragment>
            <Map courseLinestring={courseLinestring} riders={riders} />
        </React.Fragment>
    );
}

export default Riders;