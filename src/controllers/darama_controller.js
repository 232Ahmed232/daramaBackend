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
    fullName: { $in: ["Danish Taimoor","Nabeel Zafar","Faizan Sheikh"] }
  });
  const Female = await Female_actor.find({
    fullName: { $in: ["Arjumand Rahim","Nadia Afgan","Sarah Khan"] }
  });
  const directors = await Director.find({
    fullName: { $in: ["Aehsun Talish"] }
  });
  const ost = await OST.find({
    fullName: { $in: ["SHER  | OST"] }
  });
  const writers = await Writer.find({
    fullName: { $in: ["Zanjabeel Asim Shah"] }
  });
  const producers = await Producer.find({
    fullName: { $in: ["Abdullah Seja"] }
  });

  const drama = new Darama({
    name: "Shair",
    poster: "https://www.pakdramas.com/wp-content/uploads/2024/09/Shair-Drama-280x414.webp",
    plot: "Although the specifics of the plot remain a mystery, Shair is set to delve into profound themes of love, loss, and redemption. The drama is expected to weave a tapestry of complex relationships and multifaceted characters, with a narrative full of unexpected twists and emotional depth. With its promise of dramatic intensity and heartfelt storytelling, Shair is poised to captivate audiences and leave a lasting impression.",
    ost: ost.map(os => os._id),
    year: 2025,
    channel: "ARY",
    noOfEpisodes: 39,
    writers: writers.map(writer => writer._id),
    directors: directors.map(director => director._id),
    producers: producers.map(producer => producer._id),
    genres: ["Drama","Romance","Action"],
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