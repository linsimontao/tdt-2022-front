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

export const MapCourse = ({ activeCourseId, setActiveCourseId, courseData, distance, terrain, setTerrain, style2D }) => {
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
                const popup_start = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
                    .setLngLat([141.30531, 38.45812])
                    .setHTML('<h1>Hello!</h1>')
                    .addTo(map);
                setMap(map);
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
        console.log('65km', visible);
                    
        map?.setLayoutProperty('tdt-poi-065km', 'visibility', visible);
        map?.setLayoutProperty('Course065km-3', 'visibility', visible);
        map?.setLayoutProperty('Course065km-2', 'visibility', visible);
        map?.setLayoutProperty('Course065km-1', 'visibility', visible);
        map?.setLayoutProperty('Course065km-0', 'visibility', visible);
    }

    const show100KM = (visible) => {
        console.log('100km', visible);
        
        map?.setLayoutProperty('tdt-poi-100km', 'visibility', visible);
        map?.setLayoutProperty('Course100km-3', 'visibility', visible);
        map?.setLayoutProperty('Course100km-2', 'visibility', visible);
        map?.setLayoutProperty('Course100km-1', 'visibility', visible);
        map?.setLayoutProperty('Course100km-0', 'visibility', visible);
    }

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
