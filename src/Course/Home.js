import React, { createContext, useState } from 'react';
import './Home.css'
import { Map } from '../Map/MapCourse';
import { Chart } from './Chart'
import { useCourseData } from '../Data/useCourseData';

export const courseContext = createContext();

const Home = () => {
    const courseData = useCourseData();
    const [distance, setDistance] = useState(0);
    const [animation, setAnimation] = useState(false);
    
    if (!courseData) {
        return <p>Loading</p>;
    }
    
    return (
        <courseContext.Provider value={{courseData, distance, setDistance, animation, setAnimation}}>
            <React.Fragment>
                <Map />
                <Chart />
            </React.Fragment>
        </courseContext.Provider>
    );
}

export default Home;