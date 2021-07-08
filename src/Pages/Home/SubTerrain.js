import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"
import { ImageButton } from '../Common/ImageButton';

export const SubTerrain = ({ subPageActive, setSubPageActive, activeCourseId, setActiveCourseId }) => {
    return (
        <div className={subPageActive ? "subpage-terrain-active" : "subpage"}>
            <SubPageTitle subPageTitle="TERRAIN" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
            {
                subPageActive ?
                    <SubTerrainBody activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId}/> :
                    <></>
            }
        </div>
    );
}

const SubTerrainBody = ({ activeCourseId, setActiveCourseId }) => {
    const clickHandler = (id) => {
        if (id === activeCourseId) return;
        setActiveCourseId(id);
    }
    return (
        <div className="subpage-body">
            <div className="subpage-buttons">
                <ImageButton icon="MAP" text="65KM" active={activeCourseId === 0} onClick={() => clickHandler(0)} />
                <ImageButton icon="MAP" text="100KM" active={activeCourseId === 1} onClick={() => clickHandler(1)}/>
            </div>
        </div>
    );
};