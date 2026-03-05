import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

// Fallback to checking bytes directly if canvas module fails
const checkImage = () => {
  const buffer = fs.readFileSync('public/logo-vidrio.png');
  // Just print the first 50 bytes of the file for sanity
  console.log("File signature:", buffer.subarray(0, 16).toString('hex'));
};
checkImage();
