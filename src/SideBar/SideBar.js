import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, RiderIcon, MapIcon } from "../Pages/Common/CustomSVG";

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
                            <Link to={item.path}>
                                <div className="sidebar-icon-item">
                                    {item.icon}
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}