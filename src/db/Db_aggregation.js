import { Darama } from "../models/darama_model.js";
import { Actor } from "../models/actor_model.js";
import {User} from "../models/user_model.js"
import {Rating} from "../models/Rating_model.js"

const getDramasWithActorsAndRatings = async () => {
  const dramas = await Darama.aggregate([
    {
      $lookup: {
        from: "actors",
        localField: "actors",
        foreignField: "_id",
        as: "actorDetails"
      }
    },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "drama",
        as: "ratings"
      }
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings.stars" },
        totalRatings: { $size: "$ratings" }
      }
    },
    {
      $sort: { averageRating: -1 }
    }
  ]);
  return dramas;
};

const getActorsWithDramas = async () => {
  const actors = await Actor.aggregate([
    {
      $lookup: {
        from: "dramas", // or "darama" if you kept that name
        localField: "popularDarams",
        foreignField: "_id",
        as: "dramaDetails"
      }
    },
    {
      $project: {
        username: 1,
        fullName: 1,
        votes: 1,
        totalDramas: { $size: "$dramaDetails" },
        dramaDetails: { name: 1, year: 1, channel: 1 }
      }
    },
    {
      $sort: { votes: -1 }
    }
  ]);
  return actors;
};

const getUsersWithRatings = async () => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "rating",
        foreignField: "_id",
        as: "ratingDetails"
      }
    },
    {
      $unwind: {
        path: "$ratingDetails",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "dramas",
        localField: "ratingDetails.drama",
        foreignField: "_id",
        as: "dramaDetails"
      }
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        fullName: { $first: "$fullName" },
        ratings: {
          $push: {
            stars: "$ratingDetails.stars",
            comment: "$ratingDetails.comment",
            drama: { $arrayElemAt: ["$dramaDetails.name", 0] }
          }
        }
      }
    }
  ]);
  return users;
};


const getTopRatedDramas = async () => {
  const topDramas = await Rating.aggregate([
    {
      $group: {
        _id: "$drama",
        averageRating: { $avg: "$stars" },
        totalRatings: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "dramas",
        localField: "_id",
        foreignField: "_id",
        as: "dramaInfo"
      }
    },
    { $unwind: "$dramaInfo" },
    {
      $project: {
        _id: 0,
        dramaId: "$_id",
        dramaName: "$dramaInfo.name",
        channel: "$dramaInfo.channel",
        averageRating: 1,
        totalRatings: 1
      }
    },
    { $sort: { averageRating: -1, totalRatings: -1 } },
    { $limit: 10 }
  ]);
  return topDramas;
};

export {
  getDramasWithActorsAndRatings,
  getTopRatedDramas,
  getUsersWithRatings,
  getActorsWithDramas
}

