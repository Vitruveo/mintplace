// These styles apply to every route in the application
import "./globals.css";
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Mint Place</title>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
          <ToastContainer style={{ maxWidth: "400px", width: "100%" }} />
        </Providers>
      </body>
    </html>
  );
}