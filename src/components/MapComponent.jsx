// components/MapComponent.jsx
"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const LAT = 25.642399;
const LNG = 85.103569;
const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${LAT},${LNG}`;

// Violet pin via divIcon — bypasses webpack/turbopack icon path resolution bug entirely
const customIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:32px;height:32px;
      background:#7c3aed;
      border:3px solid #fff;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 4px 14px rgba(124,58,237,0.55);
    "></div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36],
});

// Separate component so hooks run inside MapContainer context
function ClickToOpenMaps() {
  useMapEvents({
    click() {
      window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer");
    },
  });
  return null;
}

const MapComponent = () => {
  const position = [LAT, LNG];

  // Inject Leaflet CSS on client only — avoids Turbopack SSR CSS import issues
  useEffect(() => {
    const id = "leaflet-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ cursor: "pointer" }}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <div
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              padding: "2px 0",
            }}
          >
            <strong style={{ color: "#7c3aed" }}>Alomonx Technology</strong>
            <br />
            <span style={{ fontSize: 12, color: "#555" }}>
              Kurji, Digha, Patna, Bihar
            </span>
            <br />
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: "#7c3aed",
                fontWeight: 600,
                marginTop: 4,
                display: "inline-block",
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </Popup>
      </Marker>
      <ClickToOpenMaps />
    </MapContainer>
  );
};

export default MapComponent;
