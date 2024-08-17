import { rgbaToThumbHash } from 'thumbhash';
import { createCanvas, loadImage } from 'canvas';

async function generateBase64ThumbHash(imagePath) {
    try {
        const img = await loadImage(imagePath);

        // Resize the image to a smaller size
        const maxWidth = 100;
        const maxHeight = 100;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;

            if (width > height) {
                width = maxWidth;
                height = Math.round(maxWidth / aspectRatio);
            } else {
                height = maxHeight;
                width = Math.round(maxHeight * aspectRatio);
            }
        }

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, width, height);

        const imageData = context.getImageData(0, 0, width, height);
        const thumbHash = rgbaToThumbHash(width, height, imageData.data);

        // Convert the ThumbHash to a Base64 string
        const thumbHashBase64 = Buffer.from(thumbHash).toString('base64');

        console.log('ThumbHash (Base64):', thumbHashBase64);
    } catch (error) {
        console.error('Failed to load the image', error);
    }
}

// Call the function with your image path
generateBase64ThumbHash('./images/combo-image.png');
