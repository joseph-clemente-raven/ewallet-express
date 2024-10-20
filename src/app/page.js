import { imgSetup } from "@/helper";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="relative w-full min-h-screen">
        <Image 
          src={`${imgSetup}pexels-anh-nguyen-517648218-28976492.jpg`} 
          alt="banner" 
          fill="layout"
          objectFit="cover"
          className="h-full w-full"
        />
        {/* Overlay div */}
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 gap-4 flex px-6 sm:px-64 flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold text-white">Seamless Travel Awaits!</h1>
          <p className="text-lg text-gray-300">Transform your commute with our e-wallet solution. Say goodbye to cash and hello to a faster, smarter way to pay for your rides! Enjoy hassle-free transactions, real-time balance tracking, and exclusive rewards—all at your fingertips. Join the cashless revolution today!</p>
          <Link href={'/trip-tracking'} className="py-2 px-6 bg-primary rounded-md text-white text-center">
            Biyahe Tayo!
          </Link>
        </div>
      </div>
    </main>
  );
}
