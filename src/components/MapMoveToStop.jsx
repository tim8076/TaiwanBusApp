import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapMoveToStop({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 15);
  }, [map, position]);
  return null;
}
