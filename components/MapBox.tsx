"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY2w1aXhxcm5pMGIxMTNsa21ldjRkanV4ZyJ9.ztk5_j48dkFtce1sTx0uWw";

type Location = {
    lng: number;
    lat: number;
};

interface MapComponentProps {
    latitude?: number;
    longitude?: number;
}

const MapBox: React.FC<MapComponentProps> = ({ latitude = 52.3676, longitude = 4.9041 }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [prevLocation, setPrevLocation] = useState<Location>({lng: longitude, lat: latitude});

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [prevLocation.lng, prevLocation.lat],
            zoom: 1,
        });

        map.current.on('click', (e) => {
            const location: Location = {
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
            };

            if (!isNaN(location.lng) && !isNaN(location.lat)) {
                new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current!);
                flyTo(e);
            }
        });

    }, []);

    useEffect(() => {
        // Fly to new location whenever latitude or longitude changes
        if (map.current && !isNaN(longitude) && !isNaN(latitude)) {
            map.current.flyTo({
                center: [longitude, latitude],
                zoom: 4,
                speed: 0.6, // slower speed
            });
            setPrevLocation({lng: longitude, lat: latitude});
        }
    }, [longitude, latitude]);

    const flyTo = (event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        const lng = event.lngLat.lng;
        const lat = event.lngLat.lat;

        if (!isNaN(lng) && !isNaN(lat) && map.current) {
            map.current.flyTo({
                center: [lng, lat],
                zoom: 6,
                speed: 0.6, // slower speed
            });
        }
    };

    return    <div
        ref={mapContainer}
        id="map"
        className="fixed top-0 right-0 h-screen w-full"
    />
};

export default MapBox;
