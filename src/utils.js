import { NetworkCodes } from "./network";

export const convertPhoneToISO = (number, countryCode = "234") => {
  if (!number) return "";
  if (number.substring(0, 4) === `+${countryCode}`) {
    return number;
  } else if (number.substring(0, 3) === countryCode) {
    return `+${number}`;
  } else if (number.charAt(0) === "0") {
    return `+${countryCode}${number.slice(1)}`;
  } else {
    return null;
  }
};

export const getNetwork = (phoneNumber) => {
  const networkData = NetworkCodes;

  const phoneNumberPrefix = phoneNumber.substring(0, 4);

  for (const network in networkData) {
    if (networkData[network].codes.includes(phoneNumberPrefix)) {
      return networkData[network].network;
    }
  }

  return "1";
};
export const FindPothole = (userLat, userLon, potholes) => {
  //const userLat = 6.5244; // User's latitude
  // const userLon = 3.3792; // User's longitude

  // // Assuming you have a list of potholes with their latitudes and longitudes
  // const potholes = [
  //   { lat: 6.5238, lon: 3.3764 },
  //   { lat: 6.5271, lon: 3.3751 },
  //   { lat: 6.5225, lon: 3.3812 },
  //   // ... more potholes
  // ];
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  // Function to convert degrees to radians
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
  // Function to calculate the bearing angle between two coordinates
  function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = degToRad(lon2 - lon1);

    const y = Math.sin(dLon) * Math.cos(degToRad(lat2));
    const x =
      Math.cos(degToRad(lat1)) * Math.sin(degToRad(lat2)) -
      Math.sin(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.cos(dLon);

    const bearing = radToBearing(Math.atan2(y, x));
    return bearing;
  }

  // Function to convert radians to bearing degrees (0° to 360°)
  function radToBearing(radians) {
    const bearing = (radToDeg(radians) + 360) % 360;
    return bearing;
  }

  // Function to convert radians to degrees
  function radToDeg(radians) {
    return radians * (180 / Math.PI);
  }

  // Example usage
  //

  // Find the closest pothole to the user
  let closestPothole;
  let closestDistance = Infinity;
  let closestBearing;
  console.log(potholes);
  potholes.forEach((pothole) => {
    const distance = calculateDistance(
      userLat,
      userLon,
      pothole.lat,
      pothole.long
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPothole = pothole;
      closestBearing = calculateBearing(
        userLat,
        userLon,
        pothole.lat,
        pothole.long
      );
    }
  });

  // Output the closest pothole, its distance, and bearing angle to the user
  // console.log(`Closest pothole: Latitude: ${closestPothole.lat}, Longitude: ${closestPothole.long}`);
  // console.log(`Distance: ${formatDistance(closestDistance)}`);
  // console.log(`Direction: ${getCardinalDirection(closestBearing)}°`);
  const response = {
    distance: formatDistance(closestDistance),
    lat: closestPothole.lat,
    long: closestPothole.long,
    direction: getCardinalDirection(closestBearing),
  };
  console.log(response);
  return response;
};
function formatDistance(distance) {
  if (distance >= 1) {
    return `${distance.toFixed(2)} kilometers`;
  } else {
    const meters = distance * 1000;
    return `${meters.toFixed(2)} meter(s)`;
  }
}
function getCardinalDirection(bearing) {
  if (bearing >= 337.5 || bearing < 22.5) {
    return "North";
  } else if (bearing >= 22.5 && bearing < 67.5) {
    return "Northeast";
  } else if (bearing >= 67.5 && bearing < 112.5) {
    return "East";
  } else if (bearing >= 112.5 && bearing < 157.5) {
    return "Southeast";
  } else if (bearing >= 157.5 && bearing < 202.5) {
    return "South";
  } else if (bearing >= 202.5 && bearing < 247.5) {
    return "Southwest";
  } else if (bearing >= 247.5 && bearing < 292.5) {
    return "West";
  } else {
    return "Northwest";
  }
}
export async function getUserLocation() {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    return {
      success: true,
      location: { latitude, longitude },
      message: "User location retrieved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error retrieving user location: ${error.message}`,
    };
  }
}
export function updateCoordinates(latitude, longitude) {
  // Offset values in meters (approximately 5 meters)
  const offsetLat = - 0.000045; // Approximately 5 meters latitude offset
  const offsetLon = 0.000000; // Approximately 5 meters longitude offset

  const updatedLatitude = latitude + offsetLat;
  const updatedLongitude = longitude + offsetLon;

  return {
    latitude: updatedLatitude,
    longitude: updatedLongitude
  };
}