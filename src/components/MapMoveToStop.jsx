import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
export default function MapMoveToStop({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 17, { animate: false });
    setTimeout(() => map.fire('zoomend'), 0); // ✅ 強制觸發 `zoomend` 事件
  }, [map, position]);
  return null;
}

MapMoveToStop.propTypes = {
  position: PropTypes.array,
}
