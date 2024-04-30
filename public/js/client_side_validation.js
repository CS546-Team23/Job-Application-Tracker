$("#signup-form").submit((event) => {
  //Get all error message placeholders
  let firstNameError = $("#firstName + span.form-error");
  let lastNameError = $("#lastName + span.form-error");
  let cityError = $("#city + span.form-error");
  let stateError = $("#state + span.form-error");
  let desiredPositionError = $("#desiredPosition + span.form-error");
  let dreamJobError = $("#dreamJob + span.form-error");
  let emailError = $("#email + span.form-error");
  let passwordError = $("#password + span.form-error");
  let confirmPasswordError = $("#confirmPassword + span.form-error");
  //Reset error messages
  firstNameError.html("");
  lastNameError.html("");
  cityError.html("");
  stateError.html("");
  desiredPositionError.html("");
  dreamJobError.html("");
  emailError.html("");
  passwordError.html("");
  confirmPasswordError.html("");

  // Errors Object
  let errors = {};

  //Validate First Name
  let firstName = $("#firstName").val().trim();
  if (firstName === undefined || firstName === null) {
    errors.firstName = "Error: First name must be provided.";
  } else if (typeof firstName !== "string") {
    errors.firstName = "Error: Invalid input for first name.";
  } else if (/[0-9]/.test(firstName)) {
    errors.firstName = "Error: First name cannot contain any numbers.";
  } else if (/<[^>]+>/i.test(firstName)) {
    errors.firstName =
      "Error: Invalid input for first name. No HTML elements are allowed.";
  } else if (firstName.length < 2 || firstName.length > 25) {
    errors.firstName =
      "Error: First name must be between 2 to 25 characters long.";
  }

  //Validate Last Name
  let lastName = $("#lastName").val().trim();
  if (lastName === undefined || lastName === null) {
    errors.lastName = "Error: Last name must be provided.";
  } else if (typeof lastName !== "string") {
    errors.lastName = "Error: Invalid input for last name.";
  } else if (/[0-9]/.test(lastName)) {
    errors.lastName = "Error: Last name cannot contain any numbers.";
  } else if (/<[^>]+>/i.test(lastName)) {
    errors.lastName =
      "Error: Invalid input for last name. No HTML elements are allowed.";
  } else if (lastName.length < 2 || lastName.length > 25) {
    errors.lastName =
      "Error: Last name must be between 2 to 25 characters long.";
  }

  //Validate City
  let city = $("#city").val().trim();
  if (city === undefined || city === null) {
    errors.city = "Error: City must be provided.";
  } else if (typeof city !== "string") {
    errors.city = "Error: Invalid input for the city.";
  } else if (/[0-9]/.test(city)) {
    errors.city = "Error: City cannot contain any numbers.";
  } else if (/<[^>]+>/i.test(city)) {
    errors.city =
      "Error: Invalid input for city. No HTML elements are allowed.";
  } else if (city.length < 3 || city.length > 30) {
    errors.city =
      "Error: City cannot be less than 3 characters or longer than 30 characters.";
  }

  //Validate State
  let state = $("#state").val().trim();
  let stateValid = false;
  if (state === undefined || state === null) {
    errors.state = "Error: State must be chosen.";
  } else if (typeof state !== "string") {
    errors.state = "Error: Invalid value for state.";
  } else if (/[0-9]/.test(state)) {
    errors.state = "Error: State cannot contain any numbers.";
  } else if (/<[^>]+>/i.test(city)) {
    errors.state =
      "Error: Invalid input for state. No HTML elements are allowed.";
  }
  let states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  for (let abb of states) {
    if (abb.toLowerCase === state.toLowerCase()) {
      stateValid === true;
      break;
    }
  }
  if (!stateValid) {
    errors.state = "Error: Invalid value for state.";
  }

  //Validate Desired Position
  let desiredPosition = $("#desiredPosition").val().trim();
  if (desiredPosition !== undefined || desiredPosition !== null) {
    if (typeof desiredPosition !== "string") {
      errors.desiredPosition = "Error: Invalid input for desired position.";
    } else if (/[0-9]/.test(desiredPosition)) {
      errors.desiredPosition =
        "Error: Desired position cannot contain any numbers.";
    } else if (/<[^>]+>/i.test(desiredPosition)) {
      errors.desiredPosition =
        "Error: Invalid input for desired position. No HTML elements are allowed.";
    } else if (desiredPosition.length > 50) {
      errors.desiredPosition =
        "Error: Desired position must be 50 characters or less.";
    }
  }

  //Validate Dream Job
  let dreamJob = $("#dreamJob").val().trim();
  if (dreamJob !== undefined || dreamJob !== null) {
    if (typeof dreamJob !== "string") {
      errors.dreamJob = "Error: Invalid input for dream job.";
    } else if (/[0-9]/.test(dreamJob)) {
      errors.dreamJob = "Error: Dream job cannot contain any numbers.";
    } else if (/<[^>]+>/i.test(dreamJob)) {
      errors.dreamJob =
        "Error: Invalid input for dream job. No HTML elements are allowed.";
    } else if (dreamJob.length > 50) {
      errors.dreamJob = "Error: Dream job must be 50 characters or less.";
    }
  }

  //Validate Email
  let email = $("#email").val().trim();
  if (!validator.isEmail(email)) errors.email = "Enter a valid email";
  if (email === undefined || email === null) {
    errors.email = "Error: Email must be provided.";
  } else if (typeof email !== "string") {
    errors.email = "Error: Invalid input for the Email.";
  } else if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errors.email = "Error: Invalid email format.";
  } else if (/<[^>]+>/i.test(email)) {
    errors.email =
      "Error: Invalid input for email. No HTML elements are allowed.";
  }

  //Validate Password
  let password = $("#password").val().trim();
  let capCheck = /[A-Z]/.test(password);
  let numCheck = /[0-9]/.test(password);
  let specialCheck = /[^a-zA-Z0-9]/.test(password);
  if (!password) {
    errors.password = "Error: Password must be supplied.";
  } else if (!capCheck && !numCheck && !specialCheck) {
    errors.password =
      "Error: Password must contain at least one capital letter, at least one number, and at least one special character.";
  } else if (password.length < 8) {
    errors.password = "Error: Password must be at least 8 characters long.";
  }

  //Validate confirm password
  let conpassword = $("#confirmPassword").val().trim();
  if (!conpassword) {
    errors.confirmPassword = "Error: Password must be supplied.";
  } else if (conpassword !== password) {
    errors.confirmPassword =
      "Error: Password and Confirm Password do not match. Please try again.";
  }

  if (Object.keys(errors).length !== 0) {
    event.preventDefault();
    if (errors.firstName) {
      firstNameError.html(errors.firstName);
    }
    if (errors.lastName) {
      lastNameError.html(errors.lastName);
    }
    if (errors.city) {
      cityError.html(errors.city);
    }
    if (errors.state) {
      stateError.html(errors.state);
    }
    if (errors.desiredPosition) {
      desiredPositionError.html(errors.desiredPosition);
    }
    if (errors.dreamJob) {
      dreamJobError.html(errors.dreamJob);
    }
    if (errors.email) {
      emailError.html(errors.email);
    }
    if (errors.password) {
      passwordError.html(errors.password);
    }
    if (errors.confirmPassword) {
      confirmPasswordError.html(errors.confirmPassword);
    }
  }
});

$("#signin-form").submit((event) => {
  //Get errors span tag on page
  let emailError = $("#email + span.form-error");
  let passwordError = $("#password + span.form-error");
  //Reset error messages
  emailError.html("");
  passwordError.html("");

  //Errors Object
  let errors = {};

  //Validate Email
  let email = $("#email").val().trim();
  if (!validator.isEmail(email)) errors.email = "Enter a valid email";
  if (email === undefined || email === null) {
    errors.email = "Error: Email must be provided.";
  } else if (typeof email !== "string") {
    errors.email = "Error: Invalid input for the Email.";
  } else if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errors.email = "Error: Invalid email format.";
  } else if (/<[^>]+>/i.test(email)) {
    errors.email =
      "Error: Invalid input for email. No HTML elements are allowed.";
  }

  //Validate Password
  let password = $("#password").val().trim();
  let capCheck = /[A-Z]/.test(password);
  let numCheck = /[0-9]/.test(password);
  let specialCheck = /[^a-zA-Z0-9]/.test(password);
  if (!password) {
    errors.password = "Error: Password must be supplied.";
  } else if (!capCheck && !numCheck && !specialCheck) {
    errors.password =
      "Error: Password must contain at least one capital letter, at least one number, and at least one special character.";
  } else if (password.length < 8) {
    errors.password = "Error: Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length !== 0) {
    event.preventDefault();
    if (errors.email) {
      emailError.html(errors.email);
    }
    if (errors.password) {
      passwordError.html(errors.password);
    }
  }
});
