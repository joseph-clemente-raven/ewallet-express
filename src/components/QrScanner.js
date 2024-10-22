// components/QrScanner.js
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';

const QrScanner = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState("Please scan the QR code to start your trip.");
  const navigate = useRouter();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          const scannedData = result.getText();
          setData(scannedData);
          navigate.push('/trip-tracking'); // Example route for continuing the trip
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      }
    );

    return () => {
      codeReader.reset();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">QR Code Trip Scanner</h2>
      <div className="relative w-full overflow-hidden border-2 border-blue-500 rounded-lg">
        <video ref={videoRef} className="w-full h-auto" autoPlay />
      </div>
      <p className="mt-4 text-sm text-blue-600 text-center">{data}</p>
    </div>
  );
};

export default QrScanner;