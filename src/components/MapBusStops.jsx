import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { memo } from "react";
import { showBusStatus } from "../tools/tools";
import L from 'leaflet';
import markerIcon from '../assets/images/icons/bus-stop-marker.png';
import markerIconACtive from '../assets/images/icons/bus-stop-marker-active.png';
import busIcon from '../assets/images/icons/carbon_bus-light.svg';
import FixMapDisplay from './FixMapDisplay';
const stopMarker = new L.Icon({
  iconUrl: markerIcon,
});
const stopMarkerActive = new L.Icon({
  iconUrl: markerIconACtive,
});
export default memo(function MapComponent({ currentStops }) {
  console.log(currentStops)
  const route = currentStops.map((stop) => {
    const { PositionLat, PositionLon } = stop.StopPosition;
    return [Number(PositionLat), Number(PositionLon)];
  });
  const centerPoint = route[Math.round(route.length / 2)];
  const stations = currentStops.map((stop) => {
    const { PositionLat, PositionLon } = stop.StopPosition;
    return {
      position: [PositionLat, PositionLon],
      name: stop.StopName.Zh_tw,
      time: showBusStatus(stop.time, stop.status).text,
    }
  })
  return (
    <MapContainer
      center={centerPoint}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      {/* 加入 OpenStreetMap 圖層 */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Polyline positions={route}
        color="#355F8B"
        weight={4}/>
      {stations.map((station, index) => {
        const maker = (station.time === '進站中' || station.time === '即將到站')
          ? stopMarkerActive
          : stopMarker;
        const bgColor = (station.time === '進站中' || station.time === '即將到站')
          ? 'active'
          : '';
        return (
          <Marker key={index}
            position={station.position}
            icon={maker}>
            <Popup className={bgColor}>
              { station.time === '進站中' && (
                <div className="text-center mb-1">
                  <img src={busIcon} alt="busIcon" width={25} height={25}/>
                </div>
              )}
              <p className="text-center mt-0 mb-1 fs-6">
                {station.name}
              </p>
              <p className="text-center my-0 fs-6">
                {station.time}
              </p>
            </Popup>
          </Marker>
        )
      })}
      {/* 標記點 */}
      {/* <Marker position={centerPoint}>
      </Marker> */}
      <FixMapDisplay />
    </MapContainer>
  );
});
