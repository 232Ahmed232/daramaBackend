import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Actor } from "../models/actor_model.js";
import { Darama } from "../models/darama_model.js";
import { getDramasWithActorsAndRatings } from "../db/Db_aggregation.js";
import { Female_actor } from "../models/Female_actor.js";
import { Director } from "../models/director_model.js";
import { OST } from "../models/ost_model.js";
import { Writer } from "../models/writer_model.js";
import { Producer } from "../models/producer_model.js";




const addDarama = asyncHandeler(async (req, res) => {
  const actors = await Actor.find({
    fullName: { $in: ["Farhan Saeed","Syed Muhammad Ahmed"] }
  });
  const Female = await Female_actor.find({
    fullName: { $in: ["Iqra Aziz","Nadia Afgan","Mashal Khan"] }
  });
  const directors = await Director.find({
    fullName: { $in: ["Aehsun Talish"] }
  });
  const ost = await OST.find({
    fullName: { $in: ["Suno Chanda 2  | OST"] }
  });
  const writers = await Writer.find({
    fullName: { $in: ["Saima Akram Chaudhry"] }
  });
  const producers = await Producer.find({
    fullName: { $in: ["Momina Duraid"] }
  });

  const drama = new Darama({
    name: "Suno Chanda season 2",
    poster: "https://upload.wikimedia.org/wikipedia/en/0/0e/Suno-chanda.jpg",
    plot: "Arsal and Jiya are childhood companions who play pranks on each other. Bi Jaan decides to get Arsal and Jiya's formal wedding and rukhsati done to honour her husband's last wish. Arsal and Jiya are against the marriage plan and team up with Kinza, Masooma's daughter, to stop the wedding.Shah Jahan, Bi Jaan's brother-in-law, and his grandson Shehryar, who lives in London, visit Pakistan for Arsal and Jiya's planned wedding after Eid. Sherry is close to his cousins and a co-conspirator in their plots to stop the marriage. Sherry asks Arsal and Jiya to resolve their problem amicably. Sherry also helps Jiya fulfil her dream of joining the London School of Economics, and they plan to study together. Sherry eventually develops feelings for Jiya, which makes Arsal jealous.Arsal and Jiya create misunderstandings between their parents. Meanwhile, Sherry falls in love with Jiya. Arsal and Jiya's parents want Arsal to divorce Jiya, but Arsal denies it. Jiya's father sends a divorce notice to Arsal, who then confesses his feelings to Jiya.Jiya initially rejects Arsal but eventually realises her love for him.Later, the family discovers that Arsal and Jiya have fallen in love. Arsal and Jiya's parents eventually give in to their love, and the wedding preparations begin. Sherry and Kinza also start liking each other.Jiya and Arsal argue again on their wedding night, but later realise their foolishness and say sorry to each other. They promise not to repeat the same mistakes and to confess their love for each other.",
    ost: ost.map(os => os._id),
    year: 2019,
    channel: "HUM",
    noOfEpisodes: 30,
    writers: writers.map(writer => writer._id),
    directors: directors.map(director => director._id),
    producers: producers.map(producer => producer._id),
    genres: ["Drama","Romance","Comedy"],
    actors: actors.map(actor => actor._id), // ✅ multiple actors
    Female_actors: Female.map(Fem => Fem._id), // ✅ multiple actors
  });

  const savedDrama = await drama.save();
  // console.log("✅ Drama added with multiple actors:", savedDrama);

  if (!savedDrama) {
    throw new ApiError(500, "dARAM  is not added")
  }

  res.status(200).json(
    new ApiResponse(200, savedDrama, "Daram is added")
  )



})

const ratedDaramas = asyncHandeler(async (req, res) => {
  const darama = await getDramasWithActorsAndRatings()
  // console.log(darama);

  res.status(200).json(
    new ApiResponse(200, darama, "Rated Daram")
  )
})


export { addDarama, ratedDaramas }