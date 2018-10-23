// Step 9B: Helper class for Validation that checks is any object empty
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "otring" && value.trim().length === 0);

module.exports = isEmpty;
