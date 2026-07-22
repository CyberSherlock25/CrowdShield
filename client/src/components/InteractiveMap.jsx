import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Crosshair, Shield, AlertTriangle, Navigation } from 'lucide-react';

// Custom Leaflet Icons using SVG strings
const createCustomIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="
        background: rgba(24, 24, 27, 0.9);
        border: 2px solid ${color};
        box-shadow: 0 0 12px ${color};
        color: white;
        padding: 3px 8px;
        border-radius: 6px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 11px;
        font-weight: bold;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
        ${label}
      </div>
    `,
    iconSize: [120, 30],
    iconAnchor: [60, 15]
  });
};

// Map Recenter Helper
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
  return null;
}

export default function InteractiveMap({ gates, droneMode, emergencyActive, riskScore }) {
  const centerLat = 28.6139;
  const centerLng = 77.2090;

  // Key Stadium Layout Points
  const stadiumCenter = [28.6139, 77.2090];
  const medicalCamp = [28.6148, 77.2075];
  const controlRoom = [28.6125, 77.2105];
  const parkingZone = [28.6152, 77.2110];

  // Evacuation Arrows / Polylines from Gate 1 (North) to Gate 2 (East) & Gate 3 (South)
  const evacuationRouteGate2 = [
    [28.6139, 77.2090], // Gate 1 North
    [28.6142, 77.2098],
    [28.6145, 77.2105]  // Gate 2 East
  ];

  const evacuationRouteGate3 = [
    [28.6139, 77.2090], // Gate 1 North
    [28.6134, 77.2092],
    [28.6130, 77.2095]  // Gate 3 South
  ];

  // Stadium Perimeter Polyline
  const stadiumPerimeter = [
    [28.6148, 77.2075],
    [28.6152, 77.2110],
    [28.6125, 77.2112],
    [28.6122, 77.2078],
    [28.6148, 77.2075]
  ];

  const getGateColor = (status, current) => {
    if (status === 'Closed' || current > 900) return '#FF3B30'; // Red
    if (status === 'Critical' || current > 750) return '#FFC107'; // Yellow/Amber
    if (status === 'Warning' || current > 550) return '#FFC107';
    return '#00C853'; // Green
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden glass-panel border border-zinc-800 flex flex-col">
      {/* Map Header Status Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-[#18181B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono-tech flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span>DIGITAL TWIN VENUE MAP</span>
        </div>
        <span className="text-zinc-600">|</span>
        <span className="text-[#00E5FF]">METROPOLIS STADIUM</span>
        {emergencyActive && (
          <span className="bg-red-950 border border-[#FF3B30] text-[#FF3B30] px-2 py-0.5 rounded font-bold animate-pulse">
            EVACUATION ARROWS ACTIVE
          </span>
        )}
      </div>

      {/* Drone HUD Overlay Layer */}
      {droneMode && (
        <div className="absolute inset-0 z-[999] pointer-events-none border-4 border-cyan-500/40 scanline flex flex-col justify-between p-4">
          <div className="flex justify-between items-start text-xs font-mono-tech text-[#00E5FF]">
            <div className="bg-black/70 p-2 rounded border border-[#00E5FF]/40">
              <div>ALTITUDE: 120m</div>
              <div>RECON CAM: 4K OPTICAL</div>
              <div>TARGET: NORTH CONCOURSE</div>
            </div>
            <div className="bg-black/70 p-2 rounded border border-[#00E5FF]/40 text-right">
              <div>PITCH: -45°</div>
              <div>THERMAL: ACTIVE</div>
              <div>GRID: 28.6139N / 77.2090E</div>
            </div>
          </div>

          {/* Crosshair Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border border-[#00E5FF]/40 rounded-full flex items-center justify-center animate-pulse">
              <Crosshair className="w-12 h-12 text-[#00E5FF]" />
            </div>
          </div>

          <div className="text-center font-mono-tech text-xs text-[#00E5FF] bg-black/60 py-1 rounded border border-[#00E5FF]/40">
            [DRONE HUD SEARCH & TRACKING MODE ACTIVE]
          </div>
        </div>
      )}

      {/* Leaflet Map */}
      <MapContainer
        center={stadiumCenter}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full dark-tiles z-0"
      >
        <MapController center={stadiumCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Stadium Outer Perimeter Boundary */}
        <Polygon
          positions={stadiumPerimeter}
          pathOptions={{ color: '#00E5FF', weight: 2, dashArray: '5, 10', fillOpacity: 0.05 }}
        />

        {/* Dynamic Evacuation Vectors (Arrows) shown when Risk > 60 or Emergency */}
        {(riskScore > 60 || emergencyActive) && (
          <>
            <Polyline
              positions={evacuationRouteGate2}
              pathOptions={{ color: '#00C853', weight: 5, dashArray: '10, 10' }}
            />
            <Polyline
              positions={evacuationRouteGate3}
              pathOptions={{ color: '#00C853', weight: 5, dashArray: '10, 10' }}
            />
          </>
        )}

        {/* Gate Markers & Heatmap Circles */}
        {gates.map((g) => {
          const color = getGateColor(g.status, g.current);
          const circleRadius = Math.max(30, (g.current / g.capacity) * 80);

          return (
            <React.Fragment key={g.id}>
              {/* Heatmap density circle */}
              <Circle
                center={[g.lat, g.lng]}
                radius={circleRadius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.35,
                  color: color,
                  weight: 2
                }}
              />

              {/* Interactive Marker */}
              <Marker
                position={[g.lat, g.lng]}
                icon={createCustomIcon(color, `${g.name.split(' ')[0]} (${g.current}/${g.capacity})`)}
              >
                <Popup>
                  <div className="p-1 font-mono-tech">
                    <div className="font-bold text-sm text-[#00E5FF] mb-1">{g.name}</div>
                    <div className="text-xs text-zinc-300">Capacity: {g.capacity}</div>
                    <div className="text-xs text-zinc-300">Current Occupancy: <strong style={{ color }}>{g.current}</strong></div>
                    <div className="text-xs text-zinc-300">Status: <strong style={{ color }}>{g.status}</strong></div>
                    <div className="text-xs text-zinc-400 mt-1">Flow Rate: {g.flowRate}</div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}

        {/* Special Infrastructure Markers */}
        <Marker position={controlRoom} icon={createCustomIcon('#A855F7', 'Control Room HQ')}>
          <Popup><div className="font-mono-tech text-xs">Command Center Headquarters</div></Popup>
        </Marker>

        <Marker position={medicalCamp} icon={createCustomIcon('#FF3B30', 'Medical Camp')}>
          <Popup><div className="font-mono-tech text-xs">Trauma First-Aid Station</div></Popup>
        </Marker>

        <Marker position={parkingZone} icon={createCustomIcon('#3B82F6', 'North Parking')}>
          <Popup><div className="font-mono-tech text-xs">Emergency Vehicle Parking</div></Popup>
        </Marker>
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#18181B]/90 backdrop-blur-md p-2.5 rounded-lg border border-zinc-800 text-[11px] font-mono-tech flex items-center gap-4">
        <span className="text-zinc-400">HEATMAP:</span>
        <span className="flex items-center gap-1 text-[#00C853]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]" /> Safe (&lt;60%)
        </span>
        <span className="flex items-center gap-1 text-[#FFC107]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" /> Warning (&gt;60%)
        </span>
        <span className="flex items-center gap-1 text-[#FF3B30]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]" /> Critical (&gt;85%)
        </span>
      </div>
    </div>
  );
}
