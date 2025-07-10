import Video from '../models/videostreaming.js';
import fs from 'fs';
import path from 'path';

// ✅ Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const { recipeId, uploaderId, duration, description } = req.body;
    const videoPath = req.file.path;

    const video = new Video({
      recipeId,
      uploaderId,
      videoUrl: videoPath,
      duration,
      description
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded', video });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

// ✅ Stream video by ID
export const streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const filePath = path.join(__dirname, '..', video.videoUrl);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      return res.status(416).send('Range header required');
    }

    const start = Number(range.replace(/\D/g, ''));
    const CHUNK_SIZE = 1 * 1e6; // 1MB
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(res);

    // Update view count
    await Video.findByIdAndUpdate(video._id, { $inc: { views: 1 } });

  } catch (err) {
    res.status(500).json({ error: 'Video streaming failed', details: err.message });
  }
};

// ✅ Get all approved videos
export const getApprovedVideos = async (req, res) => {
  try {
    const videos = await Video.find({ status: 'approved' })
      .populate('recipeId uploaderId');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// ✅ Get a video by ID (with metadata)
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('recipeId uploaderId');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch video' });
  }
};

// ✅ Approve a video
export const approveVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ message: 'Video approved', video });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

// ✅ Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Optionally delete the actual file
    const filePath = path.join(__dirname, '..', video.videoUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
};
