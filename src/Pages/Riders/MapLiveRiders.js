import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const initialMapState = {
    lng: 141.395,
    lat: 38.487,
    zoom: 12,
    pitch: 60,
    bearing: 0
}

const getGeojson = features => features.map(
    feature => ({
        ...feature.geojson,
        'properties': {
            'id': feature.id,
            'updateTime': feature.updateTime,
            'dis': feature.dis
        }
    })
);

export const MapRiders = ({ courseLinestring, riders }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [activeRidersID, setActiveRidersID] = useState([]);
    const [animation, setAnimation] = useState(false);
    const worker = new Worker('./ridersupdate.js');

    const addRiders = (map) => {
        map.loadImage('./smile.png', (error, image) => {
            if (error) throw error;
            map.addImage('ridericon-small', image, { pixelRatio: 2 });
            map.addImage('ridericon-big', image, { pixelRatio: 1 });
        })
        map.addSource('riders', {
            'type': 'geojson',
            'data': {
                "type": "FeatureCollection",
                "features": getGeojson(riders)
            },
            cluster: true,
            clusterMaxZoom: 13,
            clusterRadius: 128
        });

        map.addLayer({
            'id': 'riders-cluster',
            'type': 'symbol',
            'source': 'riders',
            'filter': ['has', 'point_count'],
            //'maxZoom': 13,
            'layout': {
                'icon-image': 'ridericon-big',
                'icon-offset': [0, -10],
                'icon-allow-overlap': true
            }
        });
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'riders',
            //maxZoom: 13,
            filter: ['has', 'point_count'],
            paint: {
                'text-color': '#FFFFFF'
            },
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 20
            }
        });

        map.addLayer({
            id: 'riders',
            type: 'symbol',
            source: 'riders',
            //minZoom: 14,
            filter: ['!', ['has', 'point_count']],
            layout: {
                'icon-image': 'ridericon-small',
                'icon-offset': [0, -10],
                'icon-allow-overlap': true
            }
        });
    }

    useEffect(
        () => {
            const map = new mapboxgl.Map({
                container: mapRef.current,
                //style: 'mapbox://styles/demo-sa-jp/cknyf2c0l0dmz17pm4ejbde6t',
                style: 'mapbox://styles/hidenoriyagi/ckpzg4tid2q6f17pe4d9da7im',
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

                addRiders(map);

                map.on('moveend', () => {
                    if (map.getZoom() < 14.0) {
                        setActiveRidersID([]);
                        setAnimation(false);
                    } else {
                        if (map.getLayer('riders')) {
                            const activeRiders = map.queryRenderedFeatures({ layers: ['riders'] });
                            setActiveRidersID(activeRiders.map(rider => rider.properties.id));
                            setAnimation(true);
                        }
                    }
                });
            });
            setMap(map);
            return () => map.remove();
        }, []
    );

    useEffect(() => {
        const postMes = (ridersArr) => {
            const data = {
                ridersArr: ridersArr,
                activeRidersIDArr: activeRidersID
            }
            worker.postMessage({ courseLinestring, data });
        }
        const runWorker = () => {
            if (map.getLayer('riders')) {
                postMes(riders);
                worker.onerror = err => console.log(err);
                worker.onmessage = e => {
                    const { newRidersArr } = e.data;
                    if (map && newRidersArr) {
                        const ridersSource = map.getSource('riders');
                        if (ridersSource) {
                            ridersSource.setData({
                                "type": "FeatureCollection",
                                "features": getGeojson(newRidersArr)
                            });
                        }
                    }
                    postMes(newRidersArr);
                };
            }
        };

        if (animation && riders && activeRidersID.length > 0) {
            runWorker();
        } else {
            worker.terminate();
        }

        return () => worker.terminate();
    }, [map, animation ]);

    return (
        <div ref={mapRef} className='map-live' />
    );
}
