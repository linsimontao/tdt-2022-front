importScripts('//unpkg.com/@turf/turf@6.3.0/turf.min.js');

const updateRiders = (courseLinestring, ridersArr, currentTime) => (
    ridersArr.map(rider => {
        return {
            id: rider.id,
            dis: rider.dis + ((currentTime - rider.updateTime)  * 10 / (1000)),
            updateTime: currentTime,
            geojson: turf.along(
                courseLinestring,
                rider.dis + ((currentTime - rider.updateTime) * 10 / (1000)),
                { units: "meters" }
            )
        }
        //if (activeRidersIDArr.includes(rider.id))
            // return {
            //     id: rider.id,
            //     dis: rider.dis + ((currentTime - rider.updateTime)  * 10 / (1000)),
            //     updateTime: currentTime,
            //     geojson: turf.along(
            //         courseLinestring,
            //         rider.dis + ((currentTime - rider.updateTime) * 10 / (1000)),
            //         { units: "meters" }
            //     )
            // };
        //else
        //    return rider;
    })
)

onmessage = (e) => {
    const { courseLinestring, data } = e.data;
    const currentTime = new Date().getTime();
    const newRidersArr = updateRiders(courseLinestring, data.ridersArr, currentTime, /*data.updateTime, data.activeRidersIDArr*/);
    postMessage({ newRidersArr });
};
