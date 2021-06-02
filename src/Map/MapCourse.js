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

export const Map = ({ pointData }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();
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

                map.addSource('point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Point',
                        'coordinates': []
                    }
                });

                map.addLayer({
                    'id': 'point',
                    'source': 'point',
                    'type': 'circle',
                    'paint': {
                        'circle-radius': 10,
                        'circle-color': '#007cbf'
                    }
                });
            });
            setMap(map);
            return () => map.remove();
        }, []
    );

    useEffect(() => {
        if (map) {
            const pointSource = map.getSource('point');
            if (pointSource) {
                pointSource.setData({
                    'type': 'Point',
                    'coordinates': pointData.coordinates
                });
            }
        }
    }, [map, pointData]);

    return (
        <div ref={mapRef} className='map' />
    );
}
