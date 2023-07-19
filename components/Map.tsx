import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY2w1aXhxcm5pMGIxMTNsa21ldjRkanV4ZyJ9.ztk5_j48dkFtce1sTx0uWw";

type Location = {
    lng: number;
    lat: number;
};

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const Map: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    console.log("In Somethingpage",latitude, longitude);
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: 5,
        });

        map.current.on('click', (e) => {
            const location: Location = {
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
            };

            new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current!);
            flyTo(e);
        });

    }, [latitude]);

    const flyTo = (event: any) => {
        const lng = event.lngLat.lng;
        const lat = event.lngLat.lat;
        console.log("Triggered", lng, lat);

        if(map.current){
            map.current.flyTo({
                center: [lng, lat],
                zoom: 4,
            });
        }
    };

    return <div ref={mapContainer} id="map" className="w-full h-[50vh]" />;
};

export default Map;
