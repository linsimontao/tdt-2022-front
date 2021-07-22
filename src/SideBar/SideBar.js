import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoIcon, RiderIcon, MapIcon } from "../Pages/Common/CustomSVG";

const data = [
    {
        title: 'RIDER',
        path: `${process.env.PUBLIC_URL}/riders`,
        icon: <RiderIcon fill="#000" width="20.55" height="18.01"/>
    },
    {
        title: 'MAP',
        path: `${process.env.PUBLIC_URL}/`,
        icon: <MapIcon fill="#000" width="16.56" height="16.56"/>
    },
    {
        title: 'INFO',
        path: '/info',
        icon: <InfoIcon fill="#000" width="17.58" height="17.58"/>
    },
    {
        title: 'INFO',
        path: '/info',
        icon: <InfoIcon fill="#000" width="17.58" height="17.58"/>
    }
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