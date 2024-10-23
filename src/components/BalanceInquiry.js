import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useGlobalContext } from '@/hooks/useContext';

const BalanceInquiry = ({back}) => {
  const [data, setData] = useState('');
  const [scanning, setScanning] = useState(false); // New state to track scanning status
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  
  const { account } = useGlobalContext();

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
                setData(`₱${checkData.balance.toFixed(2)}`);
                stopCamera()
              }
              else{
                setData('Please scan the QR code to check your balance.')
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
      {
        data ? 
        <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Current Balance</h2>
            <div className='flex w-full border-t-2 flex-col text-center py-3'>
                <p className='text-6xl font-bold text-center'>{data}</p>
            </div>
        </>
        :
        <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">QR Code Balance Inquiry Scanner</h2>
            <div className="relative w-full overflow-hidden border-2 border-blue-500 rounded-lg">
            <video ref={videoRef} className="w-full h-auto" autoPlay />
            </div>
            <p className="mt-4 text-sm text-center">Please scan the QR code to check your balance.</p>
        </>
      }  
    </div>
  );
};

export default BalanceInquiry;
