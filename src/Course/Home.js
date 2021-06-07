import React, { useState } from 'react';
import './Home.css'
import { Map } from '../Map/MapCourse';
import { Chart } from './Chart'
import { useCourseData } from '../Data/useCourseData';

const Home = () => {
    const data = useCourseData();
    const [pointData, setPointData] = useState(null);

    if (!data) {
        return <p>Loading</p>;
    }

    return (
        <React.Fragment>
            <Map pointData={pointData} />
            <Chart data={data} setPointData={setPointData} />
        </React.Fragment>
    );
}

export default Home;