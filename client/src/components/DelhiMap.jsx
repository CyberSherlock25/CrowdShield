import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Map Pin Generator
const createMapPin = (color, label, iconEmoji = '📍') => {
  return L.divIcon({
    className: 'custom-delhi-pin',
    html: `
      <div style="
        background: rgba(15, 23, 42, 0.95);
        border: 2px solid ${color};
        box-shadow: 0 0 16px ${color};
        color: white;
        padding: 4px 10px;
        border-radius: 8px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <span>${iconEmoji}</span>
        <span>${label}</span>
      </div>
    `,
    iconSize: [140, 32],
    iconAnchor: [70, 16]
  });
};

function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export default function DelhiMap({ gates, vehicles, greenCorridorActive, emergencyActive, riskBadge }) {
  // Delhi Arun Jaitley Stadium Coordinates
  const stadiumCenter = [28.6377, 77.2432];
  const hospitalLoc = [28.6355, 77.2405];
  const policeHqLoc = [28.6310, 77.2415];
  const metroLoc = [28.6258, 77.2343];
  const trafficHqLoc = [28.6280, 77.2350];
  const droneBaseLoc = [28.6410, 77.2450];

  // Green Corridor Highway Polyline Path
  const greenCorridorPath = [
    stadiumCenter,
    [28.6365, 77.2420],
    [28.6355, 77.2410],
    hospitalLoc
  ];

  return (
    <div className="relative w-full h-full min-h-[440px] rounded-xl overflow-hidden glass-panel border border-zinc-800 flex flex-col">
      {/* Top Map Header */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#09090B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono-tech flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
        <span className="text-white font-bold">DELHI EMERGENCY DIGITAL TWIN</span>
        <span className="text-zinc-600">|</span>
        <span className="text-[#00E5FF]">ARUN JAITLEY STADIUM PERIMETER</span>
        {greenCorridorActive && (
          <span className="bg-emerald-950 border border-[#00C853] text-[#00C853] px-2 py-0.5 rounded font-bold animate-pulse">
            🚦 GREEN CORRIDOR ACTIVE
          </span>
        )}
      </div>

      <MapContainer
        center={stadiumCenter}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full dark-tiles z-0"
      >
        <MapRecenter center={stadiumCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Green Corridor Route */}
        {greenCorridorActive && (
          <Polyline
            positions={greenCorridorPath}
            pathOptions={{ color: '#00C853', weight: 8, opacity: 0.9, dashArray: '10, 10' }}
          />
        )}

        {/* Stadium Gates & Heatmaps */}
        {gates && gates.map((g) => {
          const color = g.status === 'Critical' || g.current > 850 ? '#FF3B30' : (g.status === 'Warning' ? '#FFC107' : '#00C853');
          return (
            <React.Fragment key={g.id}>
              <Circle
                center={[g.lat || 28.6377, g.lng || 77.2432]}
                radius={60}
                pathOptions={{ fillColor: color, fillOpacity: 0.35, color, weight: 2 }}
              />
              <Marker
                position={[g.lat || 28.6377, g.lng || 77.2432]}
                icon={createMapPin(color, `${g.name.split(' ')[0]} (${g.current})`, '🚪')}
              >
                <Popup>
                  <div className="font-mono-tech text-xs">
                    <strong style={{ color }}>{g.name}</strong>
                    <div>Occupancy: {g.current} / {g.capacity}</div>
                    <div>Status: {g.status}</div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Landmark Pins */}
        <Marker position={stadiumCenter} icon={createMapPin('#00E5FF', 'Stadium HQ', '🏟️')}>
          <Popup><div className="font-mono-tech text-xs">Arun Jaitley Stadium Main Gate</div></Popup>
        </Marker>

        <Marker position={hospitalLoc} icon={createMapPin('#00C853', 'LNJP Hospital', '🏥')}>
          <Popup><div className="font-mono-tech text-xs">LNJP Emergency & Trauma Ward</div></Popup>
        </Marker>

        <Marker position={policeHqLoc} icon={createMapPin('#3B82F6', 'Police HQ', '🚓')}>
          <Popup><div className="font-mono-tech text-xs">Delhi Police Central Command</div></Popup>
        </Marker>

        <Marker position={trafficHqLoc} icon={createMapPin('#FF6B00', 'Traffic HQ', '🚦')}>
          <Popup><div className="font-mono-tech text-xs">Traffic Signals Override Control</div></Popup>
        </Marker>

        <Marker position={metroLoc} icon={createMapPin('#A855F7', 'Metro Station', '🚇')}>
          <Popup><div className="font-mono-tech text-xs">Mandi House Metro Interchange</div></Popup>
        </Marker>

        <Marker position={droneBaseLoc} icon={createMapPin('#000000', 'Drone Recon Base', '🛸')}>
          <Popup><div className="font-mono-tech text-xs">Aerial Drone Launch Pad</div></Popup>
        </Marker>

        {/* Live Moving Vehicles (Police & Ambulances) */}
        {vehicles && vehicles.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={createMapPin(v.type === 'police' ? '#3B82F6' : '#FF3B30', `${v.label} ${v.moving ? '(EN ROUTE)' : ''}`, v.type === 'police' ? '🚔' : '🚑')}
          />
        ))}
      </MapContainer>
    </div>
  );
}
