import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

function GoogleMaps({latitude = 1, longitude = 1}) {
  const containerStyle = {
    width: "auto",
    height: "400px",
    marginBlock: "2em",
    padding: 0,
    borderRadius: "20px",
  };
  const MapsData = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <Box>
      <LoadScript googleMapsApiKey="AIzaSyDcMcd66hrOCLWwupGPuxzkmtYdCvBeDX8">
        <GoogleMap mapContainerStyle={containerStyle} center={MapsData} zoom={14}>
          {/* Child components, such as markers, info windows, etc. */}
          <Marker  onLoad={onLoad} position={MapsData} 
          />
          <></>
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}
export default GoogleMaps;

