import React, { useState } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import ClosestPotholes from "../../components/MapLayout";
import configs from "../../config";
import { FindPothole, getUserLocation, updateCoordinates } from "../../utils";

const LandingPage = () => {
  const [userLocation, setLocation] = useState({
    lat: "0",
    long: "0",
  });
  const [potholes, setPotHoles] = useState(configs.TEST_LATS);
  const near = FindPothole(userLocation.lat, userLocation.long, potholes);
  // every 1 second check user location has changed
  window.setInterval(async () => {
    const result = await getUserLocation();

    if (result.success) {
      const { latitude, longitude } =result.location
        // userLocation.lat === "0"
        //   ? result.location
        //   : updateCoordinates(userLocation.lat, userLocation.long);
      console.log(
        `User location: Latitude: ${latitude}, Longitude: ${longitude}`
      );
      setLocation({
        lat: latitude,
        long: longitude,
      });
      // go and get potholes
    } else {
      console.error(result.message);
    }
  }, 5000);
  console.log(userLocation.lat);
  return (
    <PageLayout>
      {userLocation.lat === "0" ? (
        "Setting up"
      ) : (
        <ClosestPotholes potholes={potholes} locationCenter={userLocation} potholeDetails={near}/>
      )}
    </PageLayout>
  );
};

export default LandingPage;
