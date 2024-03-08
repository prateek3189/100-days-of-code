const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurents.json");

function getRestaurents() {
  const fileData = fs.readFileSync(filePath);
  const restaurentData = JSON.parse(fileData);
  return restaurentData;
}

function storedRestaurents(restaurents) {
  fs.writeFileSync(filePath, JSON.stringify(restaurents));
}

module.exports = { getRestaurents, storedRestaurents };
