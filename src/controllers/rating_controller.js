import { Rating } from "../models/Rating_model.js";
import { Darama } from "../models/darama_model.js";
import { User } from "../models/user_model.js";

export const addRating = async (req, res) => {
  try {
    const userId = req.user._id; // comes from JWT middleware
    const { dramaId, stars, comment } = req.body;

    // 1️⃣ Validate required fields
    if (!dramaId || !stars || !comment) {
      return res.status(400).json({ message: "Drama ID, stars, and comment are required" });
    }

    // 2️⃣ Ensure the drama exists
    const drama = await Darama.findById(dramaId);
    if (!drama) {
      return res.status(404).json({ message: "Drama not found" });
    }

    // 3️⃣ Optional: prevent duplicate ratings (one per user per drama)
    const existing = await Rating.findOne({ drama: dramaId, user: userId });
    if (existing) {
      return res.status(400).json({ message: "You have already rated this drama" });
    }

    // 4️⃣ Create the rating
    const rating = await Rating.create({
      stars,
      comment,
      drama: dramaId,
      user: userId
    });

    // 5️⃣ Push rating to the user's ratings array
    await User.findByIdAndUpdate(userId, { $push: { rating: rating._id } });

    // 6️⃣ Optional: calculate average rating for the drama
    const allRatings = await Rating.find({ drama: dramaId });
    const avgStars =
      allRatings.reduce((sum, r) => sum + r.stars, 0) / allRatings.length;

    // 7️⃣ Respond with success
    res.status(201).json({
      message: "Rating added successfully",
      rating,
      averageStars: avgStars.toFixed(2)
    });
  } catch (error) {
    console.error("❌ Error adding rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
