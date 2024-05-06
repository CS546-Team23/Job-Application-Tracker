function stateCheck(input, item_name, name, errors) {
  inputCheck(input, item_name, name, 2, 2, errors);
  if (errors[item_name]) {
    return;
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
  if (!states.includes(input.toUpperCase())) {
    errors[item_name] = `Error: Invalid value for ${name}.`;
  }
}

function inputCheck(input, item_name, name, min_length, max_length, errors) {
  // Validate input
  if (typeof input !== "string") {
    errors[item_name] = `Error: Invalid input for ${name}.`;
  } else if (item_name !== "email") {
    if (/[0-9]/.test(input)) {
      errors[item_name] = `Error: ${name} cannot contain any numbers.`;
    }
  } else if (/<[^>]+>/i.test(input)) {
    errors[
      item_name
    ] = `Error: Invalid input for ${name}. No HTML elements are allowed.`;
  } else if (min_length) {
    if (input.length < min_length) {
      errors[
        item_name
      ] = `Error: ${name} must be at least ${min_length} characters long.`;
    }
  } else if (max_length) {
    if (input.length > max_length) {
      errors[
        item_name
      ] = `Error: ${name} must be at most ${max_length} characters long.`;
    }
  }
}

function validatePassword(password, name, passwordStr, errors) {
  let capCheck = /[A-Z]/.test(password);
  let numCheck = /[0-9]/.test(password);
  let specialCheck = /[^a-zA-Z0-9]/.test(password);
  if (password === undefined || password === null || password === "") {
    errors[name] = `Error: ${passwordStr} must be supplied.`;
  } else if (!capCheck && !numCheck && !specialCheck) {
    errors[
      name
    ] = `Error: ${passwordStr} must contain at least one capital letter, at least one number, and at least one special character.`;
  } else if (password.length < 8) {
    errors[name] = `Error: ${passwordStr} must be at least 8 characters long.`;
  }
}

//Close Edit Profile Modal
$("#closeProfileModal").on("click", (event) => {
  event.preventDefault();
  $("#editProfileModal").hide();
});
//Close Change Password Modal
$("#closePasswordModal").on("click", (event) => {
  event.preventDefault();
  $("#changePasswordModal").hide();
});
//Show Edit Profile Modal
$("#showEditProfile").on("click", (event) => {
  event.preventDefault();
  $("#editProfileModal").show();
});
//Show Change Password Modal
$("#showChangePassword").on("click", (event) => {
  event.preventDefault();
  $("#changePasswordModal").show();
});

$("#editProfileModal").submit((event) => {
  //Get all error message placeholders
  let firstNameError = $("#profileFirstName + span.form-error");
  let lastNameError = $("#profileLastName + span.form-error");
  let emailError = $("#profileEmail + span.form-error");
  let cityError = $("#profileCity + span.form-error");
  let stateError = $("#profileState + span.form-error");
  let desiredPositionError = $("#profileDesiredPosition + span.form-error");
  let dreamJobError = $("#profileDreamJob + span.form-error");

  //Reset error messages
  firstNameError.html("");
  lastNameError.html("");
  emailError.html("");
  cityError.html("");
  stateError.html("");
  desiredPositionError.html("");
  dreamJobError.html("");

  //Errors Object
  let errors = {};

  //Validate First Name
  let firstName = $("#profileFirstName").val().trim();
  if (firstName !== undefined || firstName !== null) {
    inputCheck(firstName, "firstName", "First name", 2, 25, errors);
  }

  //Validate Last Name
  let lastName = $("#profileLastName").val().trim();
  if (lastName !== undefined || lastName !== null) {
    inputCheck(lastName, "lastName", "Last name", 2, 25, errors);
  }

  //Validate Email
  let email = $("#profileEmail").val().trim();
  if (email !== undefined || email !== null) {
    inputCheck(email, "email", "Email", errors);
  }

  //Validate City
  let city = $("#profileCity").val().trim();
  if (city !== undefined || city !== null) {
    inputCheck(city, "city", "City", errors);
  }

  //Validate State{
  let state = $("#profileState").val().trim();
  if (state !== "") {
    stateCheck(state, "state", "State", errors);
  }

  //Validate Desired Position
  let desiredPosition = $("#profileDesiredPosition").val().trim();
  if (desiredPosition !== undefined || desiredPosition !== null) {
    inputCheck(desiredPosition, "desiredPosition", "Desired Position", errors);
  }

  //Validate Dream Job
  let dreamJob = $("#profileDreamJob").val().trim();
  if (dreamJob !== undefined || dreamJob !== null) {
    inputCheck(dreamJob, "dreamJob", "Dream Job", errors);
  }

  if (Object.keys(errors).length != 0) {
    event.preventDefault();
    if (errors.firstName) {
      firstNameError.html(errors.firstName);
    }
    if (errors.lastName) {
      lastNameError.html(errors.lastName);
    }
    if (errors.email) {
      emailError.html(errors.email);
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
  }

  if (
    !firstName &&
    !lastName &&
    !email &&
    !city &&
    !state &&
    !desiredPosition &&
    !dreamJob
  ) {
    event.preventDefault();
    let errorMessage = $("#error-message");
    errorMessage.html("Error: No information was changed.");
  }
});

$("#changePasswordModal").submit((event) => {
  //Get errors
  let oldPasswordError = $("#oldPassword + span.form-error");
  let newPasswordError = $("#newPassword + span.form-error");
  let confirmNewPasswordError = $("#confirmNewPassword + span.form-error");

  //Reset error messages
  oldPasswordError.html("");
  newPasswordError.html("");
  confirmNewPasswordError.html("");

  //Errors Object
  let errors = {};

  //Validate Old Password
  let oldPassword = $("#oldPassword").val().trim();
  validatePassword(oldPassword, "oldPassword", "Old password", errors);

  //Validate New Password
  let newPassword = $("#newPassword").val().trim();
  validatePassword(newPassword, "newPassword", "New password", errors);

  //Validate Confirm New Password
  let confirmNewPassword = $("#confirmNewPassword").val().trim();
  validatePassword(
    confirmNewPassword,
    "confirmNewPassword",
    "Confirm new password",
    errors
  );

  //Ensure that new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    errors.confirmNewPassword =
      "Error: New password and Confirm New Password do not match. Please try again.";
  }

  if (Object.keys(errors).length !== 0) {
    event.preventDefault();
    if (errors.oldPassword) {
      oldPasswordError.html(errors.oldPassword);
    }
    if (errors.newPassword) {
      newPasswordError.html(errors.newPassword);
    }
    if (errors.confirmNewPassword) {
      confirmNewPasswordError.html(errors.confirmNewPassword);
    }
  }
});
