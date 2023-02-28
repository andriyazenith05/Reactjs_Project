import React, { Component, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function Maps_Observatory() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAzbjRGMaJg4aPwwodulP1Q68CnYwldKRM",
  })
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return <Map />;
}

function Map() {
  return <GoogleMap
    zoom={10}
    center={{ lat: 44, lng: -80 }}
    mapContainerStyle={{ width: "50%", height: "500px" }}>
  </GoogleMap>;
}

