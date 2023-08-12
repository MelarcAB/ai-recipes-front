import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


async function getGeoLocationFromIP(ip, apiKey) {
    try {
        const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${apiKey}`);
        const data = await response.json();
        return {
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city
        };
    } catch (error) {
        console.error("Error fetching IP geolocation:", error);
    }
}
function DarkMapComponent() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // Cambia esta IP por la IP que deseas buscar.
        const ip = '95.129.251.113';
        const apiKey = 'e6706169442a338c7fc3123076539153';
        getGeoLocationFromIP(ip, apiKey).then(data => {
            setLocation(data);
        });
    }, []);

    if (!location) return <div>Loading...</div>;

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ width: '100%', height: '400px' }}>
            <TileLayer
                url="https://api.mapbox.com/styles/v1/melarc/cll8im2vl00p901pdhojoaiew/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVsYXJjIiwiYSI6ImNsY2YzdDR2bjAwdzAzdnF1NnBnNnA3YWIifQ.sqS3aoKDVf4_tmkVG4hbbw"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; Mapbox'
            />
            <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                    {location.city}
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default DarkMapComponent;
