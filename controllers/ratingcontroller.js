import Rating from "../models/rating.js"; // adjust path if needed

// ✅ Add or update a rating
export const addOrUpdateRating = async (req, res) => {
  try {
    const { entityType, entityId, score } = req.body;
    const userId = req.user._id;

    if (score < 1 || score > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Update if already rated
    let rating = await Rating.findOneAndUpdate(
      { entityType, entityId, userId },
      { score },
      { new: true }
    );

    if (!rating) {
      // Create if doesn't exist
      rating = new Rating({ entityType, entityId, userId, score });
      await rating.save();
    }

    res.status(200).json({ success: true, message: "Rating saved", rating });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all ratings for an entity
export const getRatings = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    const ratings = await Rating.find({ entityType, entityId }).populate("userId", "name");

    res.status(200).json({ success: true, count: ratings.length, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get average rating for an entity
export const getAverageRating = async (req, res) => {
  try {
    const { entityType, entityId } = req.params;

    const result = await Rating.aggregate([
      {
        $match: {
          entityType,
          entityId: new mongoose.Types.ObjectId(entityId)
        }
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$score" },
          totalRatings: { $sum: 1 }
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({ averageRating: 0, totalRatings: 0 });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ (Optional) Delete user's rating
export const deleteRating = async (req, res) => {
  try {
    const { entityType, entityId } = req.body;
    const userId = req.user._id;

    const rating = await Rating.findOneAndDelete({ entityType, entityId, userId });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ success: true, message: "Rating deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
