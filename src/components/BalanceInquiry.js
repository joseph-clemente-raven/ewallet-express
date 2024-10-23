import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useRouter } from 'next/navigation';
import { account } from '@/constant';
import { toast } from 'react-toastify';

const BalanceInquiry = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState(null);
  const navigate = useRouter();
  
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
            setData(`₱${checkData.balance.toFixed(2)}`);
          }
          else{
            setData('Please scan the QR code to check your balance.')
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
      }
    };

    return () => {
      stopCamera(); // Stop camera when the component unmounts
      codeReader.reset();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-xl mx-auto p-5 bg-white rounded-lg shadow-lg">
      {
        data ? 
        <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Current Balance</h2>
            <div className='flex w-full border-t-2 flex-col text-center py-3'>
                <p className='text-6xl font-bold text-center'>₱1000</p>
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

export default BalanceInquiry