import React, { useState, useEffect } from 'react';
import { lineString } from '@turf/turf';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import { RidersData } from '../../Data/RidersData';
import { MapRiders } from './MapLiveRiders';
import { Ohen } from '../Common/Ohen';
import { RIDER } from '../../constant/Constant';
import { Fireworks } from 'fireworks-js/dist/react';

import '../Pages.css';

export const Riders = ({ active, setActive }) => {
    const [fireworks, setFireworks] = useState(false);
    if (setActive) {
        setActive(RIDER);
    }

    useEffect(() => {
        const onKeyO = (ev) => {
            if (ev.key === "o" || ev.key === "O") {
                setFireworks(true);
            }
        };
        window.addEventListener("keyup", onKeyO, false);
        const timer1 = setTimeout(() => {
            setFireworks(false);
        }, 5000);

        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true
        return () => {
            window.addEventListener("keyup", onKeyO, false);
            clearTimeout(timer1);
        };
    }, [fireworks]);
    const options = {
        speed: 3
    }
    const style = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        // background: '#000'
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
            <Ohen setFireworks={setFireworks}/>
            {
                fireworks ?
                    <Fireworks options={options} style={style} /> :
                    <></>
            }
        </div>

    );
}
