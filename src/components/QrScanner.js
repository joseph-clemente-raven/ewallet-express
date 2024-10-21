// components/QrScanner.js
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';

const QrScanner = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState('No result');
  const navigate = useRouter()

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          const scannedData = result.getText();
          setData(scannedData);

          // Show a prompt alert for confirmation
          const confirmTrip = window.confirm(`You scanned: ${scannedData}. Do you want to continue with your trip?`);
          if (confirmTrip) {
            // Handle the confirmation logic here, e.g., proceed with the trip
            alert('Great! Your trip will continue.');
            navigate.push('/trip-tracking')
          } else {
            alert('Trip canceled. Please scan again if needed.');
          }
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      }
    );

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">QR Code Scanner</h2>
      <div className="relative w-full overflow-hidden border-2 border-blue-500 rounded-lg">
        <video ref={videoRef} className="w-full h-auto" autoPlay />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-green-500 animate-scan"></div>
        </div>
      </div>
      <p className="mt-4 text-lg text-blue-600 text-center">{data}</p>
    </div>
  );
};

export default QrScanner;