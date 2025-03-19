import { useMap } from "react-leaflet";
import { useEffect } from "react";
export default function MapFitBound({ route }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(route);
  }, [map]);
  return null;
}
