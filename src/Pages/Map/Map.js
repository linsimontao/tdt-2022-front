import React, { useState } from "react";
import { MapCourse } from './MapCourse';
import { Chart } from '../Common/Chart';
import course65 from '../../Data/Course65.json';
import course100 from '../../Data/Course100.json';
import { Ohen } from '../Common/Ohen';
import { SelectComponent } from '../Common/SelectComponent';
import { MAP } from "../../constant/Constant";
import { Switch } from '../Common/Switch';
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
        name: 'コース＆LIVE中継'
    },
    {
        value: 1,
        name: 'コースをみる'
    },
    {
        value: 2,
        name: 'LIVE中継をみる'
    }
];

export const Map = ({ active, setActive }) => {
    if (setActive) {
        setActive(MAP);
    }
    const [activeCourseId, setActiveCourseId] = useState(2);
    const [activeFilterdId, setActiveFilterdId] = useState(2);
    const [distance, setDistance] = useState(0);
    const [terrain, setTerrain] = useState(true);
    const [style2D, setStyle2D] = useState(false);

    const courseChangedHandler = (e) => {
        setActiveCourseId(Course[e.target.selectedIndex].value)
    }

    const filterChangedHandler = (e) => {
        setActiveFilterdId(Filter[e.target.selectedIndex].value)
    }

    return (
        <div className="page">
            <MapCourse activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId} activeFilterdId={activeFilterdId }setActiveFilterdId={setActiveFilterdId} courseData={activeCourseId === 0 ? course65 : course100} distance={distance} terrain={terrain} setTerrain={setTerrain} style2D={style2D}/>
            <Chart courseData={activeCourseId === 0 ? course65 : course100} setDistance={setDistance} terrain={terrain} setTerrain={setTerrain} />
            <Ohen terrain={terrain} />
            <SelectComponent data={Course} type={"course"} onChangeHandler={courseChangedHandler} />
            <SelectComponent data={Filter} type={"filter"} onChangeHandler={filterChangedHandler} />
            <Switch style2D={style2D} setStyle2D={setStyle2D} />
        </div>
    );
}