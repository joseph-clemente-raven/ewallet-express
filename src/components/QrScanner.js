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
          stopCamera();  // Stop camera when QR is scannede for continuing the trip
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      }
    );

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all video tracks
        videoRef.current.srcObject = null;
        navigate.replace('/trip-tracking'); // Example rout
      }
    };

    return () => {
      stopCamera();  // Stop camera when the component unmounts
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