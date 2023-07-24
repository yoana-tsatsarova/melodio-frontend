"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY2w1aXhxcm5pMGIxMTNsa21ldjRkanV4ZyJ9.ztk5_j48dkFtce1sTx0uWw";

interface MapComponentProps {
    latitude: number;
    longitude: number;
    locations: { lat: number; lng: number }[];
}

const MapBox: React.FC<MapComponentProps> = ({ latitude, longitude, locations }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markerRefs = useRef<(mapboxgl.Marker | null)[]>([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude],
            zoom: 1,
        });

    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        // Remove old markers
        markerRefs.current.forEach((marker) => marker?.remove());
        markerRefs.current = [];

        // Add new markers
        locations.forEach((location) => {
            const marker = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current!);
            markerRefs.current.push(marker);
        });

        // Update map view to contain all markers
        const bounds = new mapboxgl.LngLatBounds();
        locations.forEach((location) => bounds.extend([location.lng, location.lat]));
        map.current.fitBounds(bounds, { padding: 50 });
    }, [locations]);

    return <div ref={mapContainer} id="map" className="fixed top-0 right-0 h-[60vh] w-full" />;
};

export default MapBox;
