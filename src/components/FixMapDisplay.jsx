import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function FixMapDisplay() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 1000); // 延遲一點時間確保 DOM 加載完成
  }, [map]);

  return null;
}