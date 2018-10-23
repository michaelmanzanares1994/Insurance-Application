// types *will* get updated with premiums after quote calls calculations class

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CoverageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  vechicleCoverage: {
    protectsOthersCoverage: {
      bodilyInjury: {
        type: Number
      }
    },
    protectsYouCoverage: {
      uninsuredMotorist: {
        type: Number
      }
    },
    protectsVechicle: {
      collision: {
        type: Number
      }
    }
  }
});

module.exports = Coverage = mongoose.model("coverage", CoverageSchema);
