import React, { useState, useContext, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { lineString, lineDistance, along } from '@turf/turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const initialMapState = {
    lng: 141.395,
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

export const Map = ({ courseData, distance }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();
    const courseLinestring = lineString(
        courseData.map(d => d.coordinates)
    );
    const courseDistance = lineDistance(courseLinestring);

    useEffect(
        () => {
            const map = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/demo-sa-jp/cknyf2c0l0dmz17pm4ejbde6t',
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
                // map.addSource('line', {
                //     type: 'geojson',
                //     lineMetrics: true,
                //     data: {
                //         "type": "FeatureCollection",
                //         "features": [
                //             courseLinestring
                //         ]
                //     }
                // });
                // map.addLayer({
                //     type: 'line',
                //     source: 'line',
                //     id: 'line',
                //     paint: {
                //         'line-color': 'red',
                //         'line-width': 5
                //     },
                //     layout: {
                //         'line-cap': 'round',
                //         'line-join': 'round'
                //     }
                // });
                marker
                    .setLngLat(courseData[0].coordinates)
                    .setPopup(popup)
                    .addTo(map)
                    .togglePopup();
                setMap(map);
            });

            return () => {
                map.remove();
            }
        }, []
    );
    useEffect(() => {
        if (map) {
            const index = courseData.filter(pt => pt.distance < distance).length;
            if (index < courseData.length) {
                marker.setLngLat(courseData[index]?.coordinates);
                popup.setHTML(courseData[index]?.elevation + 'm');
            }
        }
    }, [map, distance]);

    return (
        <div ref={mapRef} className='map-terrain' />
    );
}
