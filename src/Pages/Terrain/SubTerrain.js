import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"

export const SubTerrain = ({ subPageActive, setSubPageActive }) => {
        return (
            <div className={subPageActive? "subpage-terrain-active": "subpage"}>
                <SubPageTitle subPageTitle="TERRAIN" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
                {subPageActive? <h1>Sub Terrain</h1>: <></>}
            </div>
        );
}