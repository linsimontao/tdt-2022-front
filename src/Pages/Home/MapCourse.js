import React, { useState, useContext, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ZoomControl } from 'mapbox-gl-controls';
import { OhenIcon } from '../Common/CustomSVG';
import { lineString } from '@turf/turf';
import POIData from '../../Data/POIData.json';


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

export const Map = ({ sub, activeCourseId, courseData, distance, activePID, setActivePID }) => {
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
                setMap(map);
            });

            return () => {
                map.remove();
            }
        }, []
    );

    useEffect(() => {
        if (map && sub === 'terrain') {
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
        if (sub !== 'terrain') {
            if (displayMarker) {
                marker.togglePopup();
                marker.remove();
                setDisplayMarker(false);
            }
        }
    }, [map, sub, distance]);

    useEffect(() => {
        if (activeCourseId === 0) {
            map?.setLayoutProperty('tracks-65', 'visibility', 'visible');
            map?.setLayoutProperty('tracks-100', 'visibility', 'none');
        } else {
            map?.setLayoutProperty('tracks-65', 'visibility', 'none');
            map?.setLayoutProperty('tracks-100', 'visibility', 'visible');
        }
        setActivePID(10);
    }, [activeCourseId]);

    useEffect(() => {
        if (map && sub == 'home') {
            if (activePID === 10) {
                map?.flyTo({
                    center: [initialMapState.lng, initialMapState.lat],
                    zoom: initialMapState.zoom,
                    pitch: initialMapState.pitch,
                    bearing: initialMapState.bearing
                });
                return;
            }

            const data = POIData.features.filter(poi => poi.properties.PID === activePID);
            map.flyTo({
                center: data[0]?.geometry.coordinates,
                zoom: 15,
                bearing: 0,
                speed: 0.5, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                // easing: function (t) {
                //     return t;
                // },
                essential: true
            });
        }

    }, [activePID]);

    return (
        <>
            <div ref={mapRef} className="map-course" />
            <div className="ohen-button">
                <OhenIcon />
            </div>
        </>
    );
}
