const fs = require('fs');
const sharp = require('sharp');

async function createIcoFromSvg(svgPath, outIcoPath) {
  const svgBuf = fs.readFileSync(svgPath);
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const s of sizes) {
    const png = await sharp(svgBuf).resize(s, s).png().toBuffer();
    pngBuffers.push({ size: s, buffer: png });
  }

  // Build ICO header + directory
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry[0] = size === 256 ? 0 : size; // width
    entry[1] = size === 256 ? 0 : size; // height
    entry[2] = 0; // colorCount
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  const outBuf = Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
  fs.writeFileSync(outIcoPath, outBuf);
  console.log('Created multi-res ICO:', outIcoPath, 'size:', outBuf.length);
}

async function main() {
  await createIcoFromSvg('public/assets/logo.svg', 'public/assets/icon.ico');
  await createIcoFromSvg('public/assets/logo.svg', 'app/favicon.ico');
  await createIcoFromSvg('public/assets/logo.svg', 'public/favicon.ico');
}

main().catch(console.error);
