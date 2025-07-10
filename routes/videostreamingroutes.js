import express from 'express';
import upload from '../upload/middleware.js';

import {
  uploadVideo,
  streamVideo,
  getApprovedVideos,
  getVideoById,
  approveVideo,
  deleteVideo
} from '../controllers/videostreaming.js'; // ✅ Corrected path and extension

const router = express.Router();

// 🟢 Upload route (POST /api/videos/upload)
router.post('/upload', upload.single('video'), uploadVideo);

// 🟢 Stream video (GET /api/videos/stream/:id)
router.get('/stream/:id', streamVideo);

// 🟢 Get all approved videos
router.get('/', getApprovedVideos);

// 🟢 Get one video by ID
router.get('/:id', getVideoById);

// 🟢 Approve video (Admin)
router.put('/:id/approve', approveVideo);

// 🟢 Delete video
router.delete('/:id', deleteVideo);

export default router; // ✅ Use export default for ES modules
