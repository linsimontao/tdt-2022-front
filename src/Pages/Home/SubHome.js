import React from 'react';
import { SubPageTitle } from "../Common/SubPageTitle"
import { ImageButton } from '../Common/ImageButton';
import { POIList } from '../Common/POIList';
import POIData from '../../Data/POIData.json';

export const SubHome = ({ subPageActive, setSubPageActive, activeCourseId, setActiveCourseId }) => {
    return (
        <div className={subPageActive ? "subpage-active" : "subpage"}>
            <SubPageTitle subPageTitle="MAP" subPageActive={subPageActive} setSubPageActive={setSubPageActive} />
            {
                subPageActive ?
                    <SubHomeBody activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId}/> :
                    <></>
            }
        </div>
    );
}

const SubHomeBody = ({ activeCourseId, setActiveCourseId }) => {
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

            <POIList data={POIData?.features} activeCourseId={activeCourseId} />

        </div>
    );
};