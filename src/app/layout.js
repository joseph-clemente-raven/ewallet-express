import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Byahero",
  description: "Byahero is a commuter-friendly web application designed to revolutionize the way you travel by replacing traditional Beep cards with a modern QR code-based system. With Byahero, commuters can effortlessly scan QR codes to access transportation services and make payments, similar to an e-wallet. The app integrates seamlessly with various public transit options, providing a cashless, contactless, and hassle-free commuting experience. Byahero not only simplifies payments but also offers real-time updates on your balance, transaction history, and rewards, making your daily travel more convenient, efficient, and secure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
