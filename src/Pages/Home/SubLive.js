import React, { useState } from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"
import { ImageButton } from '../Common/ImageButton';
export const SubLive = ({ subPageActive, setSubPageActive }) => {
    return (
        <div className={subPageActive ? "subpage-active" : "subpage"}>
            <SubPageTitle subPageTitle="LIVE" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
            {
                subPageActive ?
                    <SubLiveBody /> :
                    <></>
            }
        </div>
    );
}

const SubLiveBody = () => {
    const clickHandler = () => {
        console.log("clickHandler")
    }

    return (
        <div className="subpage-body">
            <div className="subpage-buttons">
                <ImageButton icon="LIVE" text="VIDEO" active={true} onClick={() => clickHandler()} />
                <ImageButton icon="RIDER" text="MAPBOX" active={false} onClick={() => clickHandler()}/>
            </div>
        </div>
    );
};