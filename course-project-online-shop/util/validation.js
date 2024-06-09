function isEmpty(value) {
  return !value || value.trim() === "";
}

function userDetailsAreValid(email, password, name, street, postalCode, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 6 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postalCode) &&
    !isEmpty(city)
  );
}

function emailIsEquals(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = { userDetailsAreValid, emailIsEquals };
