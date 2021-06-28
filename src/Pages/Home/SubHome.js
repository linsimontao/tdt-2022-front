import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"

export const SubHome = ({ subPageActive, setSubPageActive }) => {
        return (
            <div className={subPageActive? "subpage-active": "subpage"}>
                <SubPageTitle subPageTitle="HOME" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
                {subPageActive? <h1>Sub Page</h1>: <></>}
            </div>
        );
}