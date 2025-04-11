import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { memo } from "react";
import { showBusStatus } from "../tools/tools";
import L from 'leaflet';
import markerIcon from '../assets/images/icons/bus-stop-marker.png';
import markerIconACtive from '../assets/images/icons/bus-stop-marker-active.png';
import busArriveIcon from '../assets/images/icons/bus-arrive-icon.svg';
import FixMapDisplay from './FixMapDisplay';
import MapFitBound from "./MapFitBound";
import MapMoveToStop from "./MapMoveToStop";
import CustomMaker from "./CustomMaker";
import PropTypes from 'prop-types'
const stopMarker = new L.Icon({
  iconUrl: markerIcon,
});
const stopMarkerActive = new L.Icon({
  iconUrl: markerIconACtive,
});
const busIcon = new L.Icon({
  iconUrl: busArriveIcon,
  iconAnchor: [20, -10],
});

function MapComponent({ currentStops, selectBusStop, busRealTimePositions }) {
  const route = currentStops.map((stop) => {
    const { PositionLat, PositionLon } = stop.StopPosition;
    return [Number(PositionLat), Number(PositionLon)];
  });
  const centerPoint = route[Math.round(route.length / 2)];
  const stations = currentStops.map((stop) => {
    const { PositionLat, PositionLon } = stop.StopPosition;
    return {
      id: stop.StopID,
      position: [PositionLat, PositionLon],
      name: stop.StopName.Zh_tw,
      time: showBusStatus(stop.time, stop.status).text,
    }
  });

  // bus positon
  const busPosition = currentStops.filter(stop => {
    return busRealTimePositions.find(bus => bus.StopID === stop.StopID);
  }).map(bus => {
    const { PositionLat, PositionLon } = bus.StopPosition;
    return [PositionLat, PositionLon];
  });
  
  // 移動到選擇站牌
  const selectStop = currentStops.find((stop) => stop.StopID === selectBusStop);
  const selectStopPosition = [selectStop?.StopPosition?.PositionLat, selectStop?.StopPosition?.PositionLon];

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
        console.log(station)
        const marker = (station.time === '進站中' || station.time === '即將到站')
          ? stopMarkerActive
          : stopMarker;
        const bgColor = (station.time === '進站中' || station.time === '即將到站')
          ? 'active'
          : (station.time === '尚未發車')
          ? 'notActive'
          : '';
        return (
          <CustomMaker index={index}
            key={index}
            station={station}
            marker={marker}
            bgColor={bgColor}
            zoomThreshold={15}/>
        )
      })}

      { busPosition.map((bus, index) => {
        return (
          <Marker key={index}
            position={bus}
            icon={busIcon}
          />
        )
      })}
      <MapFitBound route={route}/>
      { selectStopPosition[0] && (
        <MapMoveToStop position={selectStopPosition}/> 
      )}
      <FixMapDisplay />
    </MapContainer>
  );
}

MapComponent.propTypes = {
  currentStops: PropTypes.array,
  selectBusStop: PropTypes.string,
  busRealTimePositions: PropTypes.array,
}

export default memo(MapComponent);
