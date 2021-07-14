import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { InfoIcon, CameraIcon, RiderIcon, MapIcon, TerrainIcon } from "../Pages/Common/CustomSVG";
import './SideBar.css';
    
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
    return (
        <>
            <nav className="sidebar">
                <div className="sidebar-icon-list">
                    {data.map((item, i) => {
                        return (
                            <div className="sidebar-icon-item">
                                <Link to={item.path}>
                                    {item.icon}
                                    <p>{item.title}</p>
                                </Link>     
                            </div>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}