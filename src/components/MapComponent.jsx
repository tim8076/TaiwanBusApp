import { MapContainer, TileLayer, Marker, } from "react-leaflet";
import PropTypes from 'prop-types';

export default function MapComponent({ centerPoint }) {
  return (
    <MapContainer
      center={centerPoint} // 台北 101 經緯度
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      {/* 加入 OpenStreetMap 圖層 */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* 標記點 */}
      <Marker position={centerPoint}>
      </Marker>
    </MapContainer>
  );
}

MapComponent.propTypes = {
  center: PropTypes.array,
}
