const fs = require('fs');
const QRCode = require('qrcode');

// Create qr-codes directory if it doesn't exist
const qrDir = './qr-codes';
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}

// The URL for the QR code (will be updated when deployed)
const url = 'https://castles-painting.com'; // Update this with actual domain

async function generateQRCodes() {
    try {
        console.log('Generating QR codes for guerrilla marketing...');

        // Generate SVG version (infinitely scalable)
        const svgQR = await QRCode.toString(url, {
            type: 'svg',
            width: 256,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'H' // High error correction for damaged codes
        });

        fs.writeFileSync(`${qrDir}/castle-painting-qr.svg`, svgQR);
        console.log('✅ Generated scalable SVG: qr-codes/castle-painting-qr.svg');

        // Generate PNG versions for specific use cases
        const sizes = [
            { name: 'small', size: 512, description: 'For business cards, flyers' },
            { name: 'medium', size: 1024, description: 'For posters, banners' },
            { name: 'large', size: 2048, description: 'For vehicle wraps, billboards' },
            { name: 'trailer', size: 4096, description: 'For large trailer graphics' }
        ];

        for (const { name, size, description } of sizes) {
            const pngQR = await QRCode.toBuffer(url, {
                width: size,
                margin: 4,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            });

            fs.writeFileSync(`${qrDir}/castle-painting-qr-${name}.png`, pngQR);
            console.log(`✅ Generated ${name} (${size}px): qr-codes/castle-painting-qr-${name}.png - ${description}`);
        }

        console.log('\n🎯 QR Code Generation Complete!');
        console.log('\n📁 Files created in qr-codes/ directory:');
        console.log('  • castle-painting-qr.svg - Scalable vector format');
        console.log('  • castle-painting-qr-small.png (512px) - Business cards, flyers');
        console.log('  • castle-painting-qr-medium.png (1024px) - Posters, banners');
        console.log('  • castle-painting-qr-large.png (2048px) - Vehicle wraps');
        console.log('  • castle-painting-qr-trailer.png (4096px) - Large trailer graphics');
        console.log('\n🚀 Perfect for guerrilla marketing!');

    } catch (error) {
        console.error('❌ Error generating QR codes:', error);
    }
}

generateQRCodes();