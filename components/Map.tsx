import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
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
    const [center, setCenter] = useState<mapboxgl.LngLat | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        // Check if the map is already initialized
        if (map.current) {
            // Update the center without remounting the map
            setCenter(new mapboxgl.LngLat(longitude, latitude));
            return;
        }

        // Initialize the map for the first time
        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: 1,
            dragRotate: true,
        });

        map.current.on("dragend", () => {
            setCenter(map.current!.getCenter());
        });

        setCenter(new mapboxgl.LngLat(longitude, latitude));
    }, [latitude, longitude]);

    useEffect(() => {
        // Fly to the new center smoothly when it changes
        if (map.current && center) {
            map.current.flyTo({
                center: center,
                zoom: 1,
                essential: true, // ensures the flyTo is not interrupted by user interactions
            });
        }

        const newMarker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current!);
        setMarker(newMarker);
        flyTo(longitude, latitude);

    }, [center, latitude, longitude, marker]);

    const flyTo = (longitude: number, latitude: number) => {
        const lng = longitude;
        const lat = latitude;
        console.log("Triggered", lng, lat);

        if (map.current) {
            map.current.flyTo({
                center: center,
                zoom: 1,
            });
        }
    };

    // useEffect(() => {
    //     // Slowly spin the map continuously
    //     if (map.current) {
    //         let bearing = 0;
    //         const spinMap = () => {
    //             bearing = (bearing + 0.03) % 360;
    //             map.current!.setBearing(bearing);
    //             requestAnimationFrame(spinMap);
    //         };
    //         // requestAnimationFrame(spinMap);
    //     }
    // }, []);

    return <div ref={mapContainer} id="map" className="w-full h-[50vh]" />;
};

export default Map;
