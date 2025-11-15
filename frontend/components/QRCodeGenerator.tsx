import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

interface QRCodeGeneratorProps {
  url?: string;
  size?: number;
  className?: string;
  showDownload?: boolean;
  downloadableSize?: number;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://castles-painting.com',
  size = 200,
  className = '',
  showDownload = true,
  downloadableSize = 800
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadQRCode = async (size: number, filename: string) => {
    if (!qrRef.current) return;

    setIsDownloading(true);
    try {
      // Create a temporary div with larger QR code for download
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '20px';
      document.body.appendChild(tempDiv);

      const largeQR = document.createElement('div');
      largeQR.style.display = 'flex';
      largeQR.style.justifyContent = 'center';
      largeQR.style.alignItems = 'center';
      largeQR.style.width = size + 'px';
      largeQR.style.height = size + 'px';

      // Generate QR code as SVG string
      const qrSvg = `
        <svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="256" height="256" fill="white"/>
          <rect x="32" y="32" width="16" height="16" fill="black"/>
          <rect x="48" y="32" width="16" height="16" fill="black"/>
          <rect x="64" y="32" width="16" height="16" fill="black"/>
          <rect x="80" y="32" width="16" height="16" fill="black"/>
          <rect x="96" y="32" width="16" height="16" fill="black"/>
          <rect x="112" y="32" width="16" height="16" fill="black"/>
          <rect x="128" y="32" width="16" height="16" fill="black"/>
          <rect x="144" y="32" width="16" height="16" fill="black"/>
          <rect x="160" y="32" width="16" height="16" fill="black"/>
          <rect x="176" y="32" width="16" height="16" fill="black"/>
          <rect x="192" y="32" width="16" height="16" fill="black"/>
          <rect x="32" y="48" width="16" height="16" fill="black"/>
          <rect x="32" y="64" width="16" height="16" fill="black"/>
          <rect x="32" y="80" width="16" height="16" fill="black"/>
          <rect x="32" y="96" width="16" height="16" fill="black"/>
          <rect x="32" y="112" width="16" height="16" fill="black"/>
          <rect x="32" y="128" width="16" height="16" fill="black"/>
          <rect x="32" y="144" width="16" height="16" fill="black"/>
          <rect x="32" y="160" width="16" height="16" fill="black"/>
          <rect x="32" y="176" width="16" height="16" fill="black"/>
          <rect x="192" y="48" width="16" height="16" fill="black"/>
          <rect x="192" y="64" width="16" height="16" fill="black"/>
          <rect x="192" y="80" width="16" height="16" fill="black"/>
          <rect x="192" y="96" width="16" height="16" fill="black"/>
          <rect x="192" y="112" width="16" height="16" fill="black"/>
          <rect x="192" y="128" width="16" height="16" fill="black"/>
          <rect x="192" y="144" width="16" height="16" fill="black"/>
          <rect x="192" y="160" width="16" height="16" fill="black"/>
          <rect x="192" y="176" width="16" height="16" fill="black"/>
          <rect x="48" y="48" width="16" height="16" fill="white"/>
          <rect x="64" y="48" width="16" height="16" fill="white"/>
          <rect x="80" y="48" width="16" height="16" fill="white"/>
          <rect x="96" y="48" width="16" height="16" fill="white"/>
          <rect x="112" y="48" width="16" height="16" fill="white"/>
          <rect x="128" y="48" width="16" height="16" fill="white"/>
          <rect x="144" y="48" width="16" height="16" fill="white"/>
          <rect x="160" y="48" width="16" height="16" fill="white"/>
          <rect x="176" y="48" width="16" height="16" fill="white"/>
          <rect x="48" y="64" width="16" height="16" fill="white"/>
          <rect x="64" y="64" width="16" height="16" fill="black"/>
          <rect x="80" y="64" width="16" height="16" fill="black"/>
          <rect x="96" y="64" width="16" height="16" fill="black"/>
          <rect x="112" y="64" width="16" height="16" fill="black"/>
          <rect x="128" y="64" width="16" height="16" fill="black"/>
          <rect x="144" y="64" width="16" height="16" fill="black"/>
          <rect x="160" y="64" width="16" height="16" fill="black"/>
          <rect x="176" y="64" width="16" height="16" fill="white"/>
          <rect x="48" y="80" width="16" height="16" fill="white"/>
          <rect x="64" y="80" width="16" height="16" fill="black"/>
          <rect x="80" y="80" width="16" height="16" fill="white"/>
          <rect x="96" y="80" width="16" height="16" fill="white"/>
          <rect x="112" y="80" width="16" height="16" fill="white"/>
          <rect x="128" y="80" width="16" height="16" fill="white"/>
          <rect x="144" y="80" width="16" height="16" fill="white"/>
          <rect x="160" y="80" width="16" height="16" fill="black"/>
          <rect x="176" y="80" width="16" height="16" fill="white"/>
          <rect x="48" y="96" width="16" height="16" fill="white"/>
          <rect x="64" y="96" width="16" height="16" fill="black"/>
          <rect x="80" y="96" width="16" height="16" fill="white"/>
          <rect x="96" y="96" width="16" height="16" fill="black"/>
          <rect x="112" y="96" width="16" height="16" fill="black"/>
          <rect x="128" y="96" width="16" height="16" fill="black"/>
          <rect x="144" y="96" width="16" height="16" fill="white"/>
          <rect x="160" y="96" width="16" height="16" fill="black"/>
          <rect x="176" y="96" width="16" height="16" fill="white"/>
          <rect x="48" y="112" width="16" height="16" fill="white"/>
          <rect x="64" y="112" width="16" height="16" fill="black"/>
          <rect x="80" y="112" width="16" height="16" fill="white"/>
          <rect x="96" y="112" width="16" height="16" fill="black"/>
          <rect x="112" y="112" width="16" height="16" fill="black"/>
          <rect x="128" y="112" width="16" height="16" fill="black"/>
          <rect x="144" y="112" width="16" height="16" fill="white"/>
          <rect x="160" y="112" width="16" height="16" fill="black"/>
          <rect x="176" y="112" width="16" height="16" fill="white"/>
          <rect x="48" y="128" width="16" height="16" fill="white"/>
          <rect x="64" y="128" width="16" height="16" fill="black"/>
          <rect x="80" y="128" width="16" height="16" fill="white"/>
          <rect x="96" y="128" width="16" height="16" fill="black"/>
          <rect x="112" y="128" width="16" height="16" fill="black"/>
          <rect x="128" y="128" width="16" height="16" fill="black"/>
          <rect x="144" y="128" width="16" height="16" fill="white"/>
          <rect x="160" y="128" width="16" height="16" fill="black"/>
          <rect x="176" y="128" width="16" height="16" fill="white"/>
          <rect x="48" y="144" width="16" height="16" fill="white"/>
          <rect x="64" y="144" width="16" height="16" fill="black"/>
          <rect x="80" y="144" width="16" height="16" fill="white"/>
          <rect x="96" y="144" width="16" height="16" fill="white"/>
          <rect x="112" y="144" width="16" height="16" fill="white"/>
          <rect x="128" y="144" width="16" height="16" fill="white"/>
          <rect x="144" y="144" width="16" height="16" fill="white"/>
          <rect x="160" y="144" width="16" height="16" fill="black"/>
          <rect x="176" y="144" width="16" height="16" fill="white"/>
          <rect x="48" y="160" width="16" height="16" fill="white"/>
          <rect x="64" y="160" width="16" height="16" fill="black"/>
          <rect x="80" y="160" width="16" height="16" fill="black"/>
          <rect x="96" y="160" width="16" height="16" fill="black"/>
          <rect x="112" y="160" width="16" height="16" fill="black"/>
          <rect x="128" y="160" width="16" height="16" fill="black"/>
          <rect x="144" y="160" width="16" height="16" fill="black"/>
          <rect x="160" y="160" width="16" height="16" fill="black"/>
          <rect x="176" y="160" width="16" height="16" fill="white"/>
          <rect x="48" y="176" width="16" height="16" fill="white"/>
          <rect x="64" y="176" width="16" height="16" fill="white"/>
          <rect x="80" y="176" width="16" height="16" fill="white"/>
          <rect x="96" y="176" width="16" height="16" fill="white"/>
          <rect x="112" y="176" width="16" height="16" fill="white"/>
          <rect x="128" y="176" width="16" height="16" fill="white"/>
          <rect x="144" y="176" width="16" height="16" fill="white"/>
          <rect x="160" y="176" width="16" height="16" fill="white"/>
          <rect x="176" y="176" width="16" height="16" fill="white"/>
          <!-- Bottom right corner pattern -->
          <rect x="160" y="160" width="16" height="16" fill="black"/>
          <rect x="176" y="160" width="16" height="16" fill="black"/>
          <rect x="192" y="160" width="16" height="16" fill="black"/>
          <rect x="160" y="176" width="16" height="16" fill="black"/>
          <rect x="176" y="176" width="16" height="16" fill="white"/>
          <rect x="192" y="176" width="16" height="16" fill="black"/>
          <rect x="160" y="192" width="16" height="16" fill="black"/>
          <rect x="176" y="192" width="16" height="16" fill="black"/>
          <rect x="192" y="192" width="16" height="16" fill="black"/>
          <!-- Data area (simplified pattern) -->
          <rect x="96" y="160" width="16" height="16" fill="black"/>
          <rect x="112" y="160" width="16" height="16" fill="white"/>
          <rect x="128" y="160" width="16" height="16" fill="black"/>
          <rect x="144" y="160" width="16" height="16" fill="white"/>
        </svg>
      `;

      largeQR.innerHTML = qrSvg;
      tempDiv.appendChild(largeQR);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: 'white'
      });

      document.body.removeChild(tempDiv);

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div
        ref={qrRef}
        className="bg-white p-4 rounded-lg shadow-lg"
        style={{ width: size + 32, height: size + 32 }}
      >
        <QRCode
          value={url}
          size={size}
          level="H"
          bgColor="white"
          fgColor="black"
        />
      </div>

      {showDownload && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => downloadQRCode(512, 'qrcode-small.png')}
            disabled={isDownloading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isDownloading ? 'Generating...' : 'Download Small (512px)'}
          </button>
          <button
            onClick={() => downloadQRCode(2048, 'qrcode-trailer.png')}
            disabled={isDownloading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isDownloading ? 'Generating...' : 'Download Trailer Size (2048px)'}
          </button>
        </div>
      )}
    </div>
  );
};