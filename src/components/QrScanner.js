import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/hooks/useContext';
import { toast } from 'react-toastify';

const QrScanner = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState("Please scan the QR code to start your trip.");
  const navigate = useRouter();
  const { transaction, setCurrentAccount, account } = useGlobalContext()

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    const videoConstraints = {
      video: {
        facingMode: 'user', // Requests the front camera
      }
    };

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, err) => {
        if (result) {
          const scannedData = result.getText();
          const checkData = account.find(item => item.id === scannedData);
          if(checkData){
            
            const findTransaction = transaction.find(item => item.accountid);
            if(findTransaction?.status === 'Ongoing'){
              stopCamera('/end-trip'); // Stop camera when QR is scanned
              setCurrentAccount(checkData)
            }
            else{
              stopCamera('/trip-tracking'); // Stop camera when QR is scanned
              setCurrentAccount(checkData)
            }
            setData(scannedData);
          }
          else{
            toast.error("Invalid Account");
          }
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      },
      videoConstraints // Pass the video constraints here
    );

    const stopCamera = (link) => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all video tracks
        videoRef.current.srcObject = null;
        navigate.replace(link); // Example route
      }
    };

    return () => {
      codeReader.reset();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">QR Code Trip Scanner</h2>
      <div className="relative w-full overflow-hidden border-2 border-blue-500 rounded-lg">
        <video ref={videoRef} className="w-full h-auto" autoPlay />
      </div>
      <p className="mt-4 text-sm text-blue-600 text-center">{data}</p>
    </div>
  );
};

export default QrScanner;