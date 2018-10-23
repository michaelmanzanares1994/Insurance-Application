// Step 9C: Server side Validation for registration
const Validator = require("validator");
const isEmpty = require("./is-empty");

// Create an errors object that has properties relating to specific errors
module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characaters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be greater than 5 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password and comfirmation password must match";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Comfirmation password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};