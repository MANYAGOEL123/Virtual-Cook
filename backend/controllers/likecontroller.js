import Like from "../models/like.js"; 


export const addLike = async (req, res) => {
  try {
    const { entityType, entityId } = req.body;
    const userId = req.user._id;

    
    const existingLike = await Like.findOne({ entityType, entityId, userId });

    if (existingLike) {
      return res.status(400).json({ message: "You have already liked this." });
    }

    const like = new Like({ entityType, entityId, userId });
    await like.save();

    res.status(201).json({ success: true, message: "Liked!", like });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { entityType, entityId } = req.body;
    const userId = req.user._id;

    const like = await Like.findOneAndDelete({ entityType, entityId, userId });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ success: true, message: "Unliked" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    const likes = await Like.find({ entityType, entityId });

    res.status(200).json({ success: true, count: likes.length, likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const hasUserLiked = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const userId = req.user._id;

    const like = await Like.findOne({ entityType, entityId, userId });

    res.status(200).json({ success: true, liked: !!like });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
