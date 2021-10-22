import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ZoomControl } from 'mapbox-gl-controls';
import { lineString } from '@turf/turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const initialMapState = {
    lng: 141.36,
    lat: 38.487,
    zoom: 11.5,
    pitch: 60,
    bearing: 0
}

const marker = new mapboxgl.Marker({
    color: 'red',
    scale: 0.8,
    draggable: false,
    pitchAlignment: 'auto',
    rotationAlignment: 'auto'
});
const popup = new mapboxgl.Popup({ closeButton: false });

export const MapCourse = ({ activeCourseId, setActiveCourseId, activeFilterdId, setActiveFilterdId, courseData, distance, terrain, setTerrain, style2D }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const [displayMarker, setDisplayMarker] = useState(false);
    const courseLinestring = lineString(
        courseData?.features.map(d => d.geometry.coordinates)
    );
    
    const [popup1, setPopup1] = useState();
    const [popup2, setPopup2] = useState();
    const [popup3, setPopup3] = useState();

    const [course1, setCourse1] = useState();

    useEffect(
        () => {
            const map = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/hidenoriyagi/ckrlgj0cya9fm17p3pzz9fy5k',
                center: [initialMapState.lng, initialMapState.lat],
                zoom: initialMapState.zoom,
                pitch: initialMapState.pitch,
                bearing: initialMapState.bearing
            });
            map.on('load', () => {
                map.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
                map.setTerrain({
                    'source': 'mapbox-dem',
                    'exaggeration': 1.5
                });
                map.addLayer({
                    'id': 'sky',
                    'type': 'sky',
                    'paint': {
                        'sky-type': 'atmosphere',
                        'sky-atmosphere-sun': [0.0, 0.0],
                        'sky-atmosphere-sun-intensity': 15
                    }
                });

                map.addControl(new ZoomControl(), 'top-right');
                setMap(map);

                showLive(map);
                showCourse(map);

            });

            map.once('idle', () => {
                if (map) {
                    setActiveCourseId(0); 
                }
            });

            return () => {
                map.remove();
            }
        }, []
    );

    useEffect(() => {
        if (map && terrain) {
            const index = courseData.features.filter(pt => pt.properties.dis < distance).length;
            if (!displayMarker) {
                marker.setLngLat(courseData.features[0].geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map)
                    .togglePopup();
                setDisplayMarker(true);
            }
            if (index < courseData.features.length) {
                marker.setLngLat(courseData.features[index]?.geometry.coordinates);
                popup.setHTML(courseData.features[index]?.properties.ele + 'm');
            }
        }
    }, [map, terrain, distance]);
    
    const show65KM = (visible) => {
        map?.setLayoutProperty('tdt-poi-065km', 'visibility', visible);
        map?.setLayoutProperty('Course065km-3', 'visibility', visible);
        map?.setLayoutProperty('Course065km-2', 'visibility', visible);
        map?.setLayoutProperty('Course065km-1', 'visibility', visible);
        map?.setLayoutProperty('Course065km-0', 'visibility', visible);
    }

    const show100KM = (visible) => {
        map?.setLayoutProperty('tdt-poi-100km', 'visibility', visible);
        map?.setLayoutProperty('Course100km-3', 'visibility', visible);
        map?.setLayoutProperty('Course100km-2', 'visibility', visible);
        map?.setLayoutProperty('Course100km-1', 'visibility', visible);
        map?.setLayoutProperty('Course100km-0', 'visibility', visible);
    }

    // 
    const showCourse = (map) => {
        const popup_course_1 = new mapboxgl.Popup({ offset: [0,-50],closeOnClick: false, closeButton: false })
        .setLngLat([141.314630, 38.417032]).setHTML(
            `<div class="course-label"><span class="course-label-detail">9</span></div><div class="course-youtube-player"><iframe class="course-youtube-player" src="https://www.youtube.com/embed/nOJyxG9-JLk?autoplay=1&mute=1&controls=0" title=""
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
             </div>
        `
        )
        .addTo(map);

        setCourse1( popup_course_1) ;

        popup_course_1.getElement().children[1].style.borderRadius = "40px";

    }

    //
    const hiddenCourse = () => {
        course1.remove();
    }

    // 
    const showLive = (map) => {
        // スタート・ゴール地点
        const popup_start_1 = new mapboxgl.Popup({ offset: [0,-50],closeOnClick: false, closeButton: false })
        .setLngLat([141.304630, 38.457032]).setHTML(
            `<div class="live-videos-label">LIVE</div><div class= "live-youtube-player"><iframe width="106" height="60" src="https://www.youtube.com/embed/nOJyxG9-JLk?autoplay=1&mute=1&controls=0" title=""
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
             </div>
        `
        )
        .addTo(map);

        setPopup1( popup_start_1) ;

        // 女川AS
        const popup_start_2 = new mapboxgl.Popup({offset: [0,-35], closeOnClick: false, closeButton: false })
        .setLngLat([141.446953, 38.444997]).setHTML(
            `<div class="live-videos-label">LIVE</div><div class= "live-youtube-player"><iframe width="106" height="60" src="https://www.youtube.com/embed/ntBlmTrDVjw?autoplay=1&mute=1&controls=0" title=""
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
             </div>
        `
        )
        .addTo(map);

        setPopup2( popup_start_2) ;

        // 雄勝AS
        const popup_start_3 = new mapboxgl.Popup({ offset: [0,-62],closeOnClick: false, closeButton: false })
        .setLngLat([141.466010, 38.511783]).setHTML(
            `<div class="live-videos-label">LIVE</div><div class= "live-youtube-player"><iframe width="106" height="60" src="https://www.youtube.com/embed/a3Yw0RNUetI?autoplay=1&mute=1&controls=0" title=""
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
             </div>
        `
        )
        .addTo(map);

        setPopup3( popup_start_3) ;

    }
    const hiddenLive = () => {
        popup1.remove();
        popup2.remove();
        popup3.remove();
    }

    useEffect(() => {
        if (map) {
            hiddenCourse();
            hiddenLive();
        if (activeFilterdId === 0) {    //  コース＆LIVE中継
            showCourse(map);
            showLive(map);
            } else if (activeFilterdId === 1) { // コースを見る
                showCourse(map);
            } else {   // LIVE中継をみる
                showLive(map);
            }
        }
    }, [activeFilterdId]);

    useEffect(() => {
        if (map) {
            if (activeCourseId === 0) {
                show65KM('visible');
                show100KM('none');
            } else if (activeCourseId === 1) {
                show65KM('none');
                show100KM('visible');    
            } else {
                show65KM('none');
                show100KM('none'); 
            }
        }
    }, [activeCourseId]);

    useEffect(() => {
        if (map) {
            const activeCourseId_local = activeCourseId;
            setActiveCourseId(2);
            map.setStyle( style2D? 'mapbox://styles/hidenoriyagi/ckqjhj7kj2lzt18p54hc3ee2j': 'mapbox://styles/hidenoriyagi/ckrlgj0cya9fm17p3pzz9fy5k');
            map.once('idle', () => {
                setActiveCourseId(activeCourseId_local);
            }) 
        }
        //activeCourseId === 0? show65KM('visible'): show100KM('visible');
    }, [style2D])

    return (
        <>
            <div ref={mapRef} className={terrain? "map-course-terrain": "map-course"} />
        </>
    );
}
