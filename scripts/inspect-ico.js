const fs = require('fs');
const sharp = require('sharp');

sharp('public/extracted-asset-icon.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    // Top-left background color
    const bgIdx = (2 * info.width + 2) * 4;
    console.log('Background RGBA:', data[bgIdx], data[bgIdx+1], data[bgIdx+2], data[bgIdx+3]);
    
    // Lens center
    const lens1Idx = (8 * info.width + 8) * 4;
    console.log('Lens 1 RGBA:', data[lens1Idx], data[lens1Idx+1], data[lens1Idx+2], data[lens1Idx+3]);

    const lens3Idx = (16 * info.width + 23) * 4;
    console.log('Lens 3 RGBA:', data[lens3Idx], data[lens3Idx+1], data[lens3Idx+2], data[lens3Idx+3]);
  });
