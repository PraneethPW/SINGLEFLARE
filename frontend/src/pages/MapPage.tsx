import { useEffect, useRef } from "react";
import L from "leaflet";
import { demoIncidents } from "../utils/data";

export function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current).setView([28.6139, 77.209], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(map);
    demoIncidents.forEach((incident) => {
      L.circleMarker([incident.lat, incident.lng], {
        radius: incident.severity === "Critical" ? 16 : 11,
        color: incident.severity === "Critical" ? "#ff3d2e" : "#00d1ff",
        fillOpacity: 0.45
      }).addTo(map).bindPopup(`<strong>${incident.title}</strong><br/>${incident.category} - ${incident.severity}`);
    });
    return () => { map.remove(); };
  }, []);

  return (
    <div className="space-y-4">
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-black">Live incident map</h2>
        <p className="mt-2 text-slate-300">Markers show incidents, severity clusters, and responder activity zones.</p>
      </div>
      <div ref={mapRef} className="shadow-cyber" />
    </div>
  );
}
