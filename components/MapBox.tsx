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
    locations: Location[];
}

const MapBox: React.FC<MapComponentProps> = ({ latitude = 52.3676, longitude = 4.9041, locations = [] }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [prevLocation, setPrevLocation] = useState<Location>({lng: longitude, lat: latitude});
    const [markerRefs, setMarkerRefs] = useState<mapboxgl.Marker[]>([]);

    // Initiate the map
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [prevLocation.lng, prevLocation.lat],
            zoom: 1,
        });
    }, []);

    // Add markers to the map
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        // remove all previous markers
        markerRefs.forEach((marker) => marker.remove());
        const newMarkerRefs: mapboxgl.Marker[] = [];

        // Add new markers
        locations.forEach((location) => {
            const marker = new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(map.current!);
            newMarkerRefs.push(marker);
        });

        setMarkerRefs(newMarkerRefs);
    }, [locations]);

    // Fly to new location whenever latitude or longitude changes
    useEffect(() => {
        if (map.current && !isNaN(longitude) && !isNaN(latitude)) {
            setTimeout(() => {
                map.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 7,
                    speed: 0.8, // slower speed
                });
                setPrevLocation({lng: longitude, lat: latitude});
            }, 2000);
        }
    }, [longitude, latitude]);

    return    <div
        ref={mapContainer}
        id="map"
        className="fixed top-0 right-0 h-[50vh] w-fill"
    />
};

export default MapBox;
