const ImageKit = require('imagekit'); // Use the standard import

const client = new ImageKit(
    {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // Required
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Required
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT // Required
    }
);

async function uploadFile(file) {
    // Use .upload(), not .files.uploadFile()
    const result = await client.upload({
        file: file, 
        fileName: "music_" + Date.now(), // Must be fileName with a capital N
        folder: "spotify/music"
    });

    return result;
}

module.exports = { uploadFile };