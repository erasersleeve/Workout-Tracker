const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");



const PORT = process.env.PORT || 8080

const app = express();
app.use(logger("dev"));
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes

//create new workout form
app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

//work out tracker
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

//workouts
// fetch("/api/workouts/range")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     populateChart(data);
//   });

//exercise get is not necessary I think
app.get("/exercises", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    // .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    }) 
})


app.post("/api/workouts", (req, res) => {
    //{day: Date.now() }   ??
    db.Workout.create()
    .then (dbWorkout => { 
        console.log(dbWorkout);
        location.search = "?id=" + workout_id;
    })

    //catch {message} 
    .catch(err => {
        res.json(err);
    })
})


//Add to an Existing Workout
app.put("/api/workouts/:id", (req, res) => {
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(
            { 
                _id: req.params.id 
            }, { 
                $push: { exercises: _id } 
            }, { 
                new: true 
            })
            )
        .then(dbWorkout => {
            console.log(req.params);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
