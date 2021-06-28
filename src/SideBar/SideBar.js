import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { InfoIcon, CameraIcon, RiderIcon, MapIcon, TerrainIcon } from "./CustomSVG";
import './SideBar.css';
const data = [
    {
        title: 'MAP',
        path: '/',
        icon: <MapIcon />
    },
    {
        title: 'RIDER',
        path: '/riders',
        icon: <RiderIcon />
    },
    {
        title: 'TERRAIN',
        path: '/terrain',
        icon: <TerrainIcon />
    },
    {
        title: 'LIVE',
        path: '/live',
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