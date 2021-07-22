import React, { useState } from "react";
import { MapCourse } from './MapCourse';
import { Chart } from '../Common/Chart';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import { Ohen } from '../Common/Ohen';
import { SelectComponent } from '../Common/SelectComponent';
import './Terrain.css';

const Course = [
    {
        value: 0,
        name: '女川・雄勝 65km'
    },
    {
        value: 1,
        name: '北上 100km'
    }
];

const Filter = [
    {
        value: 0,
        name: '全部をみる'
    },
    {
        value: 1,
        name: '全部をみる'
    },
    {
        value: 2,
        name: 'LIVE中継をみる'
    }
];

export const Map = ({ sub }) => {
    const [activeCourseId, setActiveCourseId] = useState(0);
    const [distance, setDistance] = useState(0);
    const [terrain, setTerrain] = useState(true);

    const courseChangedHandler = (e) => {
        setActiveCourseId(Course[e.target.selectedIndex])
    }

    const filterChangedHandler = (e) => {
        console.log(e.target.selectedIndex);
    }

    return (
        <div className="page">
            <MapCourse activeCourseId={activeCourseId} courseData={activeCourseId === 0 ? course65 : course100} distance={distance} terrain={terrain} setTerrain={setTerrain} />
            <Chart courseData={activeCourseId === 0 ? course65 : course100} setDistance={setDistance} terrain={terrain} setTerrain={setTerrain} />
            <Ohen />
            <SelectComponent data={Course} type={"course"} onChangeHandler={courseChangedHandler} />
            <SelectComponent data={Filter} type={"filter"} onChangeHandler={filterChangedHandler} />
        </div>
    );
}