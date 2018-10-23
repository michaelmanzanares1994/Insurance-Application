const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  customerInfo: {
    primaryDriver: {
      basicInfo: {},
      contactInfo: {}
    },
    otherDriver: {
      basicInfo: {},
      contactInfo: {}
    },
    driverUsage: {}
  },
  vechicleInfo: {
    primaryVechile: {
      basicInfo: {},
      securityInfo: {}
    },
    secondaryVechile: {
      basicInfo: {}
    }
  },
  consumerReports: {
    creditReport: {},
    InsuranceHistory: {}
  }
});

module.exports = Quote = mongoose.model("quote", QuoteSchema);
