import { useState } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import './Maps.css';

const Maps = (props) => {
  const { isLoaded } = props;
  const [selectedMarker, setSelectedMarker] = useState('');
  const containerStyle = {
    width: '70vw',
    height: '70vh',
  };

  const center = {
    lat: -7.090911,
    lng: 107.668887,
  };

  const markers = [
    {
      name: 'Bandung',
      position: {
        lat: -6.914744,
        lng: 107.60981,
      },
    },
    {
      name: 'center',
      position: {
        lat: -7.090911,
        lng: 107.668887,
      },
    },
    {
      name: 'Coba',
      position: {
        lat: -7.003759,
        lng: 107.647818,
      },
    },
  ];
  return (
    isLoaded && (
      <>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {markers.map((marker) => (
            <Marker
              key={marker.name}
              position={marker.position}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
            >
              <div>
                <h1>{selectedMarker.name}</h1>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    )
  );
};

export default Maps;
