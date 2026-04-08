/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'src', 'assets', 'images');

const readAllPngs = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readAllPngs(full));
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      files.push(full);
    }
  }
  return files;
};

const getViewBoxSize = (svgText) => {
  const match = svgText.match(/viewBox="[^"]*?([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)"/);
  if (!match) return null;
  const w = parseFloat(match[3]);
  const h = parseFloat(match[4]);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
  return { width: w, height: h };
};

const isSvg = (buffer) => buffer.toString('utf8', 0, 200).includes('<svg');

const convertFile = (filePath) => {
  const input = fs.readFileSync(filePath);
  if (!isSvg(input)) return false;

  const svgText = input.toString('utf8');
  const size = getViewBoxSize(svgText);
  const scale = 4;
  const width = size ? Math.round(size.width * scale) : 256;
  const height = size ? Math.round(size.height * scale) : 256;

  const resvg = new Resvg(svgText, {
    fitTo: { mode: 'width', value: width },
  });
  const pngData = resvg.render().asPng();
  fs.writeFileSync(filePath, pngData);
  return true;
};

const files = readAllPngs(assetsDir);
let converted = 0;
for (const file of files) {
  if (convertFile(file)) converted += 1;
}

console.log(`Converted ${converted} SVG-as-PNG files.`);
