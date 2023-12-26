import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';

const center = [-7.090911, 107.668887];

export default function Geo() {
  const [kota, setKota] = useState([]);

  useEffect(() => {
    getKota();
    console.log(kota);
  }, []);
  const getKota = async () => {
    const response = await axios.get('http://localhost:3001/kota');
    setKota(response.data.data);
  };
  return (
    <MapContainer center={center} zoom={8.5} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=bT1LkehtnvQBjAuEGxM2"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
        const kotaData = kota.find((kotaItem) => kotaItem.kota.toLowerCase() === state.properties.kabkot.toLowerCase());
        const totalPerusahaan = kotaData ? kotaData.total : 0;

        return (
          <Polygon
            pathOptions={{
              fillColor: '#27ae60',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: '',
                  fillColor: '#f1c40f',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: '3',
                  color: 'white',
                  fillColor: '#27ae60',
                });
              },
              click: (e) => {},
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} style={{ fontSize: '12px' }} permanent>
              <div>{state.properties.kabkot}</div>
              <div>{`Total: ${totalPerusahaan}`}</div>
            </Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
