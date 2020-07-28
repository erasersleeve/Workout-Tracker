const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    name: {
      type: String
      },
    type: {
        type: String
    },
    distance: {
        type: Number
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
    duration: {
        type: Number
    }
  }]
  },
  {
  toJSON: {
    // include any virtual properties when data is requested
    virtuals: true
  }
});

// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  // return this.exercises.reduce((total, exercise) => {
  //   return total + exercise.duration;
  // }, 0);
  let counter = 0;
  for (i=0; i<this.exercises.length; i++) {
    //["duration"] works like [i].duration
    counter = counter+this.exercises[i]["duration"]
  } 
  return counter;
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
