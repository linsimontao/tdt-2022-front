import { along } from '@turf/turf';

export const RidersData = (courseLinestring) => {
    let riders = Array.from(
        { length: 25 }, 
        x => {
            const dis = Math.random() * 60 * 1000;
            return {
                dis: dis,
                geojson: along(courseLinestring, dis, {units: "meters"})
            }
        }
    );
    return riders;
}