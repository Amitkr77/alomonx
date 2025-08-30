import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://alomonx.com/wp-content/plugins/wp-map-block/assets/dist/images/marker-icon.2b3e1faf.png",
  iconSize: [25, 40],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40],
});

const MapComponent = () => {
  const position = [25.642399, 85.103569]; 

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <h6>Alomonx</h6>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
