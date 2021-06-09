import React, { useState, useContext, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { courseContext } from '../Course/Home';
import { lineString, lineDistance, along } from '@turf/turf';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

const initialMapState = {
    lng: 141.395,
    lat: 38.487,
    zoom: 11,
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

export const Map = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();

    const { courseData, distance, setDistance, animation, setAnimation } = useContext(courseContext)
    //usememo
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

                map.addSource('line', {
                    type: 'geojson',
                    lineMetrics: true,
                    data: {
                        "type": "FeatureCollection",
                        "features": [
                            courseLinestring
                        ]
                    }
                });

                map.addLayer({
                    type: 'line',
                    source: 'line',
                    id: 'line',
                    paint: {
                        'line-color': 'rgba(0,0,0,0)',
                        'line-width': 5
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    }
                });
                marker
                    .setLngLat(courseData[0].coordinates)
                    .setPopup(popup)
                    .addTo(map)
                    .togglePopup();
                setMap(map);
                setAnimation(true);
            });

            return () => map.remove();
        }, []
    );

    useEffect(() => {
        if (animation && map) {
            map.once('idle').then(() => {
                const animationDuration = 100000;
                let start;
                function frame(time) {
                    if (!start) start = time;
                    const animationPhase = (time - start) / animationDuration;
                    if (animationPhase > 1) {
                        setAnimation(false);
                        return;
                    }

                    const currentDistance = courseDistance * animationPhase;
                    setDistance(currentDistance);
                    const index = courseData.filter(pt => pt.distance < currentDistance).length;
                    
                    popup.setHTML('Altitude: ' + courseData[index].elevation + 'm<br/>');
                    marker.setLngLat(courseData[index].coordinates);

                    map.setPaintProperty('line', 'line-gradient', [
                        'step',
                        ['line-progress'],
                        'red',
                        animationPhase,
                        'rgba(255, 0, 0, 0)'
                    ]);

                    const rotation = -animationPhase * 200.0;
                    map.setBearing(rotation % 360);

                    requestAnimationFrame(frame);
                }
                requestAnimationFrame(frame);
            })
        }
    }, [map, animation]);

    useEffect(() => {
        if (map && !animation) {
            const index = courseData.filter(pt => pt.distance < distance).length;
            marker.setLngLat(courseData[index].coordinates);
        }
    }, [map, animation, distance]);

    return (
        <div ref={mapRef} className='map' />
    );
}
