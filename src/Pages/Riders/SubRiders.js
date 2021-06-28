import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"

export const SubRiders = ({ subPageActive, setSubPageActive }) => {
        return (
            <div className={subPageActive? "subpage-active": "subpage"}>
                <SubPageTitle subPageTitle="RIDER" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
                {subPageActive? <h1>Sub Riders</h1>: <></>}
            </div>
        );
}