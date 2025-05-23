import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from 'react';
import busIcon from '../assets/images/icons/carbon_bus-light.svg';
import PropTypes from 'prop-types';
export default function CustomMaker({ index, station, marker, bgColor, zoomThreshold = 10 }) {
  const map = useMap();
  const markerRef = useRef(null);
  const [showMarker, setShowMarker] = useState(false);
  useEffect(() => {
    setShowMarker(map.getZoom() >= zoomThreshold);
    const handleZoom = () => {
      setShowMarker(map.getZoom() >= zoomThreshold);
      if (markerRef.current && map.getZoom() >= zoomThreshold) {
        markerRef.current?.openPopup(); // 打開 Popup
      } else {
        markerRef.current?.closePopup(); // 關閉 Popup
      }
    };
    map.on('zoomend', handleZoom);
    return () => map.off('zoomend', handleZoom);
  }, [map, zoomThreshold]);
  return (
    <>
      { showMarker && (
        <Marker key={index}
          ref={markerRef}
          position={station.position}
          options={{ id: station.id }}
          icon={marker}>
            <Popup className={bgColor}
              autoPan={false}
              autoClose={false}>
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
      )}
    </>
  )
}

CustomMaker.propTypes = {
  index: PropTypes.number,
  station: PropTypes.object,
  marker: PropTypes.object,
  bgColor: PropTypes.string,
  zoomThreshold: PropTypes.number
}