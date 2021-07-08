import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"
export const SubInfo = ({ subPageActive, setSubPageActive }) => {
    return (
        <div className={subPageActive ? "subpage-active" : "subpage"}>
            <SubPageTitle subPageTitle="INFO" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
            {
                subPageActive ?
                    <SubInfoBody /> :
                    <></>
            }
        </div>
    );
}

const SubInfoBody = () => {
    return (
        <div className="subpage-body">
        </div>
    );
};