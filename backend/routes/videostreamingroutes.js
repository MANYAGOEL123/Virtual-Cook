import express from 'express';
import upload from '../upload/middleware.js';

import {
  uploadVideo,
  streamVideo,
  getApprovedVideos,
  getVideoById,
  approveVideo,
  deleteVideo
} from '../controllers/videostreaming.js'; 
const router = express.Router();

router.post('/upload', upload.single('video'), uploadVideo);


router.get('/stream/:id', streamVideo);

router.get('/', getApprovedVideos);
router.get('/:id', getVideoById);


router.put('/:id/approve', approveVideo);


router.delete('/:id', deleteVideo);

export default router; 
