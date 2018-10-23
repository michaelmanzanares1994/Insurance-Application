// Bring in mongoose and use its schema to create a model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Step 4: Create a Schema and define fields
const AgentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Pass in name we want to use, and the actual schema created
module.exports = Agent = mongoose.model("users", AgentSchema);
