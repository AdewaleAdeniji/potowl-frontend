import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FindPothole } from "../utils";

const ClosestPotholes = ({ potholes, locationCenter, potholeDetails }) => {
  const [potsholeDetails, setPotHoleDetails] = useState({
    distance: "0",
    lat: "0",
    long: "0",
    direction: "",
  }); 
  const position = [locationCenter.lat, locationCenter.long];
  const near = FindPothole(locationCenter.lat, locationCenter.long, potholes);
  useEffect(()=> {
    setPotHoleDetails(near)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[locationCenter, potholes])
  return (
    <Box p={4}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "20px" }}>
          {potholeDetails.distance} to the closest Pothole
        </h1>
        <h1 style={{ fontSize: "20px" }}>
          Direction of the pothole: {potholeDetails.direction}
        </h1>
      </div>
      {position.toString()}

      <Flex mb={4}>
        <Box w="400px" h="400px">
          <MapContainer
            center={position}
            zoom={30}
            scrollWheelZoom={false}
            style={{
              height: "calc(100vh - 300px)",
              width: "90vw",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} permanent>
              <Popup>YOU</Popup>
            </Marker>
            
            {potholes.map((pothole, index) => (
              <Marker key={index} position={[pothole.lat, pothole.long]}>
                <Popup>Pothole is here</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default ClosestPotholes;
