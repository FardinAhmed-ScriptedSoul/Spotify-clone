const musicModel = require('../models/music.model.js');
const albumModel = require('../models/album.model.js');
const { uploadFile } = require('../services/storage.service.js');

async function createMusic(req, res) {
    try {
        // 1. Validation
        if (!req.file) {
            return res.status(400).json({ message: "No music file uploaded" });
        }
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // 2. Upload using buffer (more reliable than base64 for audio)
        const result = await uploadFile(req.file.buffer);

        // 3. Save to DB (req.user comes from the middleware)
        const music = await musicModel.create({
            url: result.url,
            title: title,
            artist: req.user.id 
        });

        return res.status(201).json({
            message: "Music created successfully",
            music
        });

    } catch (error) {
        console.error("CREATE MUSIC ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function createAlbum(req, res) {
    try {
        const { title, music } = req.body; 

        if (!title || !music || !Array.isArray(music)) {
            return res.status(400).json({ message: "Title and an array of music IDs are required" });
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id, 
            musics: music
        });

        return res.status(201).json({
            message: "Album created Successfully",
            album
        });

    } catch (error) {
        console.error("ALBUM ERROR:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

async function getAllMusics(req,res){
    const musics = await musicModel
    .find()
    .skip(1)
    .limit(2)
    .populate('artist')

    res.status(200).json(
        {
            message:"Music fetched successfully",
            musics:musics
        }
    )
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().select("title artist ").populate('artist',"username email")
    res.status(200).json(
        {
            message:"Albums fetched successfully",
            albums:albums
        }
    )
}

async function getAlbumById(req,res){
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate('artist',"username email").populate('music')

    res.status(200).json(
        {
            message:"Album fetched successfully",
            album:album
        }
    )
}

module.exports = { createMusic , createAlbum , getAllMusics, getAllAlbums , getAlbumById };