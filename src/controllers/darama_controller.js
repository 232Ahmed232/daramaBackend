import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Actor } from "../models/actor_model.js";
import { Darama } from "../models/darama_model.js";






const addDarama = asyncHandeler(async(req,res)=>{
     const actors = await Actor.find({
      username: { $in: ["Danish Taimoor", "Sarah Khan"] }
    });

    const drama = new Darama({
      name: "Sher",
      poster:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTMZMbqMJSN6Ffm9hMowngEaLlHQmsOiF4F2dFGn5Kgkl6mp_a82bXIgH2f_zM_yTnCendoPVoB4j84XJmZ_LtgpUUeDnxBM8eNbGJ6Fw0",
      plot:"The head of a village in Sindh as well as a Feudal lord, Murtasim Shahnawaz Khan (Wahaj Ali) is a handsome, charismatic and dominating young man, who is on a stroll in the fields to discern the progress of the crops when one of the farmers mournfully informs him of the threats they are agonised with and enlightens him of the rising menace to their fields imposed by a cutthroat rival in the village named, Malik Mukhtar and his vile son, Malik Zubair. Being the village's premier, Murtasim heeds the whole situation and it quite incenses him. He's known to be responsible as well as ruthless when it comes to protecting and ensuring his people's safety. When Malik tries to create problems over a mere land that he desires which is owned by Murtasim, it's the cue for Murtasim to assert his true dominance. Hence, to instill terror and warn his foes of further barbarity against his people and meddling in the village's peace, Murtasim barges into Malik's mansion and threatens to kill his son —thus fueling the red-hot rivalry further.",
      ost:"https://www.youtube.com/watch?v=X20tWrpYAA4",
      year: 2022,
      channel: "GEO",
      noOfEpisodes: 38,
      writers: ["Siraj-ul-Haque"],
      directors: ["	Siraj-ul-Haque"],
      producers: ["Abdullah Kadwani","Asad Qureshi"],
      genres: ["Romance"],
      actors: actors.map(actor => actor._id) // ✅ multiple actors
    });

    const savedDrama = await drama.save();
    // console.log("✅ Drama added with multiple actors:", savedDrama);

    if (!savedDrama) {
        throw new ApiError(500,"dARAM  is not added")
    }

    res.status(200).json(
        new ApiResponse(200,savedDrama,"Daram is added")
    )



})

export {addDarama}