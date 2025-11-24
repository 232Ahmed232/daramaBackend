import { Darama } from "../models/darama_model.js";
import { Actor } from "../models/actor_model.js";
import { Director } from "../models/director_model.js";
import { OST } from "../models/ost_model.js";
import { Female_actor } from "../models/Female_actor.js";
import { Writer } from "../models/writer_model.js";
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
        from: "writers",
        localField: "writers",
        foreignField: "_id",
        as: "writerDetails"
      }
    },
    {
      $lookup: {
        from: "directors",
        localField: "directors",
        foreignField: "_id",
        as: "directorsDetails"
      }
    },
    {
      $lookup: {
        from: "female_actors",
        localField: "Female_actors",
        foreignField: "_id",
        as: "Female_ActorsDetails"
      }
    },
    {
      $lookup: {
        from: "osts",
        localField: "ost",
        foreignField: "_id",
        as: "OST"
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

// Actors 

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

// Directors

const getDirectorsWithDramas = async () => {
  const directors = await Director.aggregate([
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
  return directors;
};

// Writers

const getWritersWithDramas = async () => {
  const writers = await Writer.aggregate([
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
  return writers;

};


// Female Actors

const getFemaleActorsWithDramas = async () => {
  const females = await Female_actor.aggregate([
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
  return females;

};


//OST

const getOSTWithDramas = async () => {
  const ost = await OST.aggregate([
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
  return ost;

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
  getActorsWithDramas,
  getDirectorsWithDramas,
  getFemaleActorsWithDramas,
  getOSTWithDramas,
  getWritersWithDramas,
  

}

