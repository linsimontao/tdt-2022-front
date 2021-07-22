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

export const MapCourse = ({ activeCourseId, courseData, distance, terrain, setTerrain }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const [displayMarker, setDisplayMarker] = useState(false);
    const courseLinestring = lineString(
        courseData?.features.map(d => d.geometry.coordinates)
    );

    useEffect(
        () => {
            const map = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/demo-sa-jp/ckqtbxxwz5wna17qzzymbdkqe',
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

                const popup_start = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
                    .setLngLat([141.30531, 38.45812])
                    .setHTML('<h1>Hello World!</h1>')
                    .addTo(map);
                setMap(map);
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

    useEffect(() => {
        if (activeCourseId === 0) {
            map?.setLayoutProperty('tracks-65', 'visibility', 'visible');
            map?.setLayoutProperty('tracks-100', 'visibility', 'none');
        } else {
            map?.setLayoutProperty('tracks-65', 'visibility', 'none');
            map?.setLayoutProperty('tracks-100', 'visibility', 'visible');
        }
    }, [activeCourseId]);

    return (
        <>
            <div ref={mapRef} className={terrain? "map-course-terrain": "map-course"} />
        </>
    );
}
