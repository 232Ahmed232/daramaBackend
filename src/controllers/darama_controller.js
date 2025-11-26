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





const addDarama = asyncHandeler(async (req, res) => {
  const actors = await Actor.find({
    fullName: { $in: ["Wahaj Ali"] }
  });
  const Female = await Female_actor.find({
    fullName: { $in: ["Yumna Zaidi"] }
  });
  const directors = await Director.find({
    fullName: { $in: ["Siraj-ul-Haque"] }
  });
  const ost = await OST.find({
    fullName: { $in: ["Tere Bin | OST"] }
  });
  const writers = await Writer.find({
    fullName: { $in: ["Nooran Makhdoom"] }
  });

  const drama = new Darama({
    name: "Tere Bin",
    poster: "https://tse4.mm.bing.net/th/id/OIP.Bnh4zNfWsn87McZTCSoWRwHaEE?rs=1&pid=ImgDetMain&o=7&rm=3",
    plot: "The head of a village in Sindh as well as a Feudal lord, Murtasim Shahnawaz Khan (Wahaj Ali) is a handsome, charismatic and dominating young man, who is on a stroll in the fields to discern the progress of the crops when one of the farmers mournfully informs him of the threats they are agonised with and enlightens him of the rising menace to their fields imposed by a cutthroat rival in the village named, Malik Mukhtar and his vile son, Malik Zubair. Being the village's premier, Murtasim heeds the whole situation and it quite incenses him. He's known to be responsible as well as ruthless when it comes to protecting and ensuring his people's safety. When Malik tries to create problems over a mere land that he desires which is owned by Murtasim, it's the cue for Murtasim to assert his true dominance. Hence, to instill terror and warn his foes of further barbarity against his people and meddling in the village's peace, Murtasim barges into Malik's mansion and threatens to kill his son —thus fueling the red-hot rivalry further.",
    ost: ost.map(os => os._id),
    year: 2022,
    channel: "GEO",
    noOfEpisodes: 58,
    writers: writers.map(writer => writer._id),
    directors: directors.map(director => director._id),
    producers: ["Abdullah Kadwani", "Asad Qureshi"],
    genres: [
      "Drama",
      "Romance",
      "Action"],
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