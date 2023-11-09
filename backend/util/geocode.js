const fs = require('fs');
const ExifParser = require('exif-parser');
const axios = require('axios');

module.exports.extractLocationFromImage = async (imagePath) => {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Parse the Exif data from the image
    const parser = ExifParser.create(imageBuffer);
    const result = parser.parse();

    // Extract GPS data from Exif (if available)
    const gps = result.tags;

    if (gps) {
      // GPS data is available
      const latitude = gps.GPSLatitude;
      const longitude = gps.GPSLongitude;
      // const latitudeRef = gps.GPSLatitudeRef;
      // const longitudeRef = gps.GPSLongitudeRef;

      // // Convert GPS coordinates to decimal format
      // const latitudeDecimal = convertToDecimal(latitude, latitudeRef);
      // const longitudeDecimal = convertToDecimal(longitude, longitudeRef);

      // Construct the location object
      const location = {
        latitude: latitude,
        // latitude: latitudeDecimal,
        longitude: longitude,
        // longitude: longitudeDecimal,
      };

      return location;
    } else {
      // No GPS data available in the image
      return null;
    }
  } catch (error) {
    console.error('Error extracting location from image:', error);
    throw error;
  }
};

// Helper function to convert GPS coordinates to decimal format
// function convertToDecimal(coordinate, direction) {
//   const [degrees, minutes, seconds] = coordinate;
//   let decimal = degrees + minutes / 60 + seconds / 3600;
//   if (direction === 'S' || direction === 'W') {
//     decimal = -decimal;
//   }
//   return decimal;
// }
