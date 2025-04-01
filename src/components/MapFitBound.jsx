import { useMap } from "react-leaflet";
import { useEffect } from "react";
import PropTypes from 'prop-types';
export default function MapFitBound({ route }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(route);
  }, [map]);
  return null;
}

MapFitBound.propTypes = {
  route: PropTypes.array,
}
