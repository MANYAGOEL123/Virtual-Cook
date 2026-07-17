import Comment from '../models/comment.js'; 


export const createComment = async (req, res) => {
  try {
    const { entityType, entityId, text } = req.body;
    const userId = req.user._id; 

    const newComment = new Comment({
      entityType,
      entityId,
      userId,
      text
    });

    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create comment", error: error.message });
  }
};


export const getCommentsByEntity = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    const comments = await Comment.find({
      entityType,
      entityId
    }).populate("userId", "name email"); 

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch comments", error: error.message });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete comment", error: error.message });
  }
};

