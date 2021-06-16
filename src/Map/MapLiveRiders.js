import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

const initialMapState = {
    lng: 141.395,
    lat: 38.487,
    zoom: 12,
    pitch: 60,
    bearing: 0
}

const getGeojson = features => features.map((feature) => feature.geojson);

export const Map = ({ courseLinestring, riders }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const worker = new Worker('./ridersupdate.js');

    const addRiders = (map) => {
        map.loadImage('./icon.png', (error, image) => {
            if (error) throw error;
            map.addImage('ridericon', image, { pixelRatio: 5 });
        })
        // data from opendata.cityofboise.org/
        map.addSource('riders', {
            'type': 'geojson',
            'data': {
                "type": "FeatureCollection",
                "features": getGeojson(riders)
            }
        });
        map.addLayer({
            'id': 'riders',
            'type': 'symbol',
            'source': 'riders',
            'layout': {
                'icon-image': 'ridericon',
                'icon-offset': [0, -10],
                'icon-allow-overlap': true
            }
        });
    }

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
                        'line-color': 'rgba(255,0,0,1)',
                        'line-width': 5
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    }
                });

                addRiders(map);
            });
            setMap(map);
            return () => map.remove();
        }, []
    );

    useEffect(() => {
        const postMes = (ridersArr, updateTime) => {
            const data = {
                ridersArr: ridersArr,
                updateTime: updateTime
            }
            worker.postMessage({ courseLinestring, data });
        }
        const runWorker = () => {
            postMes(riders, new Date().getTime());
            worker.onerror = err => err;
            worker.onmessage = e => {
                const { newRidersArr, updateTime } = e.data;
                if (map && newRidersArr) {
                    const ridersSource = map.getSource('riders');
                    if (ridersSource) {
                        ridersSource.setData({
                            "type": "FeatureCollection",
                            "features": getGeojson(newRidersArr)
                        });
                    }
                }
                postMes(newRidersArr, updateTime);
            };
        };

        if (riders) {
            runWorker();
        }

        return () => worker.terminate()
    }, [map]);

    return (
        <div ref={mapRef} className='map-live' />
    );
}
