"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb2xpbmFuaWNoaXRhIiwiYSI6ImNsazhkZWI2dDBoY2QzcHFyYWxhcnBxeDUifQ.zjDBTNvYiqJNeXoCqaYcMA';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });
    return (
        <div className="container mx-auto justify-center items-center flex h-[50vh] w-[50vw] " >
            <div ref={mapContainer} className="flex h-[100vh] w-[100vw] mx-auto justify-center items-center" />
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    )
}
export default Map
