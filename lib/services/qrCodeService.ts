// import QRCode, {QRCodeErrorCorrectionLevel} from 'qrcode';
// import {createCanvas} from 'canvas';
// import JSZip from 'jszip';
//
// async function generateQRCodeCanvas(ids: string, qrSize: number, textSize: number, level: QRCodeErrorCorrectionLevel = 'M') {
//   const margin: number = 3;
//   const canvasHeight: number = qrSize + textSize + (margin * 2);
//   const canvasWidth: number = qrSize + margin;
//   const canvas = createCanvas(canvasWidth, canvasHeight);
//   const ctx = canvas.getContext('2d');
//
//   // Generate QR code
//   await QRCode.toCanvas(canvas, ids, {
//     width: qrSize,
//     margin: margin,
//     errorCorrectionLevel: level,
//   });
//
//   // Position the text just below the QR code with adequate spacing
//   ctx.font = `${textSize}px Arial`;
//   ctx.textAlign = 'center';
//   ctx.fillStyle = 'black';
//   const textPositionY = qrSize - (margin + textSize) * 0.55;
//   ctx.fillText(ids, canvasWidth / 2, textPositionY);
//
//   return canvas.toBuffer();
// }
//
// // Function to create zip file from multiple QR codes
// export async function generateQRCodeZip(datas: string[], qrSize: number, level: QRCodeErrorCorrectionLevel) {
//   const zip = new JSZip();
//   const textSize = +(qrSize * 0.05).toFixed(0);
//
//   for (let i = 0; i < datas.length; i++) {
//     const data = datas[i];
//     const buffer = await generateQRCodeCanvas(data, qrSize, textSize, level);
//     zip.file(`${datas[i]}.png`, buffer);
//   }
//
//   const content = await zip.generateAsync({type: 'nodebuffer'});
//   return content;
// }
