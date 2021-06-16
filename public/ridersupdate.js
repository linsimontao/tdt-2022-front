importScripts('//unpkg.com/@turf/turf@6.3.0/turf.min.js');

const updateRiders = (courseLinestring, ridersArr, millisec) => (
    ridersArr.map(rider => {
        return {
            dis: rider.dis + (millisec * 10 / (1000)),
            geojson: turf.along(
                courseLinestring,
                rider.dis + (millisec * 10 / (1000)),
                { units: "meters" }
            )
        }
    })
)

onmessage = (e) => {
    const { courseLinestring, data } = e.data;
    const currentTime = new Date().getTime();
    if (currentTime - data.updateTime <= 0) {
        console.log("minus");
    }
    const newRidersArr = updateRiders(courseLinestring, data.ridersArr, currentTime - data.updateTime);
    postMessage({
        newRidersArr: newRidersArr,
        updateTime: currentTime,
    });
};
