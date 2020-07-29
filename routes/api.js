const router = require("express").Router();
const Workout = require("../models/workout.js");


//get last workout
router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    }) 
})
//create workout
router.post("/api/workouts", (req, res) => {
    Workout.create({})
    .then (dbWorkout => { 
        res.json(dbWorkout);
    })
    .catch(message => {
        res.json(message);
    })
})
//Add to an Existing Workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

//for stats page
router.get("/api/workouts/range", (req,res) => {
    Workout.find({})
    .limit(7)
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    })
})

module.exports = router;