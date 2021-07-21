import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { InfoIcon, CameraIcon, RiderIcon, MapIcon, TerrainIcon } from "../Pages/Common/CustomSVG";

const data = [
    {
        title: 'MAP',
        path: `${process.env.PUBLIC_URL}/`,
        icon: <MapIcon />
    },
    {
        title: 'RIDER',
        path: `${process.env.PUBLIC_URL}/riders`,
        icon: <RiderIcon />
    },
    {
        title: 'TERRAIN',
        path: `${process.env.PUBLIC_URL}/terrain`,
        icon: <TerrainIcon />
    },
    {
        title: 'LIVE',
        path: `${process.env.PUBLIC_URL}/live`,
        icon: <CameraIcon />
    },
    {
        title: 'INFO',
        path: '/info',
        icon: <InfoIcon />
    },
];

export const SideBar = () => {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <div className="hamburger" onClick={() => setMenu(!menu)}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <nav className={menu? "sidebar": "sidebar-none"}>
                <div className="sidebar-icon-list">
                    {data.map((item, i) => {
                        return (
                            <Link to={item.path}>
                                <div className="sidebar-icon-item">
                                    {item.icon}
                                    <p>{item.title}</p>
                                    <div className="sidebar-arrow">></div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}