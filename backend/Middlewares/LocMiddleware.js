const ExifParser = require("exif-parser");
const fs = require("fs");

// Location Extraction Middleware
module.exports.extractLocationFromImage = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image file not provided in the request", success: false });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const parser = ExifParser.create(imageBuffer);
    const result = parser.parse();
    const latitude = result.tags.GPSLatitude;
    const longitude = result.tags.GPSLongitude;

    if (latitude && longitude) {
      // Convert GPS coordinates to decimal format
      const latitudeDecimal = convertToDecimal(latitude, result.tags.GPSLatitudeRef);
      const longitudeDecimal = convertToDecimal(longitude, result.tags.GPSLongitudeRef);

      // Attach the location to the request object
      req.location = {
        latitude: latitudeDecimal,
        longitude: longitudeDecimal,
      };

      next();
    } else {
      return res.status(400).json({ message: "Location not found in the image metadata", success: false });
    }
  } catch (error) {
    console.error("Error extracting location from image:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Helper function to convert GPS coordinates to decimal format
function convertToDecimal(coordinate, direction) {
  const [degrees, minutes, seconds] = coordinate;
  let decimal = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    decimal = -decimal;
  }
  return decimal;
}
