import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/hooks/useContext';
import { toast } from 'react-toastify';

const QrScanner = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false); // New state to track scanning status
  const [data, setData] = useState("Please scan the QR code to start your trip.");
  const navigate = useRouter();
  const codeReader = useRef(null);
  const { transaction, setCurrentAccount, account } = useGlobalContext()
  
  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    // Start camera when component is mounted
    startCamera();

    return () => {
      // Cleanup when the component is unmounted
      codeReader.current.reset();
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    if (codeReader.current) {
      try {
        // List video input devices and use the first one
        const videoInputDevices = await codeReader.current.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0]?.deviceId;

        // Start decoding from the video device (camera)
        if (selectedDeviceId && videoRef.current) {
          setScanning(true); // Set scanning to true before starting
          await codeReader.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
            if (result) {
              const scannedData = result.getText();
              const checkData = account.find(item => item.id === scannedData);
              if(checkData){
                const findTransaction = transaction.filter(item => item.accountid && item.status == 'Ongoing');
                if(findTransaction.length > 0){
                  setCurrentAccount(checkData);
                  setData(scannedData);
                  stopCamera(); // Stop camera when QR is scanned
                  navigate.replace('/end-trip'); // Stop camera when QR is scanned
                  return;
                }
                else{
                  setCurrentAccount(checkData);
                  setData(scannedData);
                  stopCamera(); // Stop camera when QR is scanned
                  navigate.replace('/trip-tracking');
                  return;
                }
              }
              else{
                toast.error("Invalid Account");
              }
              setScanning(false); // Set scanning to false after a successful read
            }
            if (err) {
              if (err instanceof NotFoundException) {
                // Only log if currently scanning
                if (scanning) {
                  console.log('No QR code found. Please ensure the QR code is visible and clear.');
                }
              } else {
                console.error('Decoding error:', err);
              }
            }
          });
        } else {
          console.error('No video input devices found or no reference to video element');
        }
      } catch (err) {
        console.error('Error starting video stream', err);
      }
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">QR Code Trip Scanner</h2>
      <div className="relative w-full overflow-hidden border-2 border-blue-500 rounded-lg">
        <video ref={videoRef} className="w-full h-full" autoPlay />
      </div>
      <p className="mt-4 text-sm text-blue-600 text-center">{data}</p>
    </div>
  );
};

export default QrScanner;