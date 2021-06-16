import { along } from '@turf/turf';

export const RidersData = (courseLinestring) => {
    const currentTime = new Date().getTime();
    let riders = Array.from(
        { length: 300 }, 
        (x, i) => {
            const dis = Math.random() * 60 * 1000;
            return {
                id: i,
                dis: dis,
                updateTime: currentTime,
                geojson: along(courseLinestring, dis, {units: "meters"})
            }
        }
    );
    return riders;
}