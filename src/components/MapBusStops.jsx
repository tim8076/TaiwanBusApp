import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { memo, useEffect, useRef } from "react";
import { showBusStatus } from "../tools/tools";
import L from 'leaflet';
import markerIcon from '../assets/images/icons/bus-stop-marker.png';
import markerIconACtive from '../assets/images/icons/bus-stop-marker-active.png';
import busArriveIcon from '../assets/images/icons/bus-arrive-icon.svg';
import FixMapDisplay from './FixMapDisplay';
import MapFitBound from "./MapFitBound";
import MapMoveToStop from "./MapMoveToStop";
import CustomMaker from "./CustomMaker";
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
export default memo(function MapComponent({ currentStops, selectBusStop, busRealTimePositions }) {
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
  console.log('busRealTimePositions', busRealTimePositions);
  console.log('currentStop', currentStops)
  const busPosition = currentStops.filter(stop => {
    return busRealTimePositions.find(bus => bus.StopID === stop.StopID);
  }).map(bus => {
    const { PositionLat, PositionLon } = bus.StopPosition;
    return [PositionLat, PositionLon];
  });
  console.log(busPosition)
  
  // 移動到選擇站牌
  const selectStop = currentStops.find((stop) => stop.StopID === selectBusStop);
  const selectStopPosition = [selectStop?.StopPosition?.PositionLat, selectStop?.StopPosition?.PositionLon];

  // 打開選擇站牌的 marker
  // const markerRefs = useRef([]);
  // useEffect(() => {
  //   const marker = markerRefs.current.find(ref => {
  //     return ref?.options.options.id === selectBusStop;
  //   });
  //   if (marker) marker.openPopup();
  // }, [selectBusStop, markerRefs])

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
        const marker = (station.time === '進站中' || station.time === '即將到站')
          ? stopMarkerActive
          : stopMarker;
        const bgColor = (station.time === '進站中' || station.time === '即將到站')
          ? 'active'
          : '';
        return (
          <CustomMaker index={index}
            key={index}
            station={station}
            marker={marker}
            bgColor={bgColor}
            zoomThreshold={15}/>
          // <Marker key={index}
          //   ref={(el) => (markerRefs.current[index] = el)}
          //   position={station.position}
          //   options={{ id: station.id }}
          //   icon={marker}>
          //   <Popup className={bgColor}>
          //     { station.time === '進站中' && (
          //       <div className="text-center mb-1">
          //         <img src={busIcon} alt="busIcon" width={25} height={25}/>
          //       </div>
          //     )}
          //     <p className="text-center mt-0 mb-1 fs-6">
          //       {station.name}
          //     </p>
          //     <p className="text-center my-0 fs-6">
          //       {station.time}
          //     </p>
          //   </Popup>
          // </Marker>
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
});
