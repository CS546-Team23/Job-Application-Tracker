// input : value of form item
// item_name : what to edit in the error object/attribute name
// name : human formatted name of attribute
// error_obj : object to add errors to
function stateCheck(input, item_name, name, error_obj) {
    inputCheck(input, item_name, name, 2, 2, error_obj);
    if (error_obj[item_name]) { return; }
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

function inputCheck(input, item_name, name, min_length, max_length, error_obj, required=true) {
    // Validate input
    if ( input === undefined || input === null || (input === "" && required) ) {
        error_obj[item_name] = `Error: ${name} must be provided.`;
    } else if (typeof input !== "string") {
        error_obj[item_name] = `Error: Invalid input for ${name}.`;
    } else if (/[0-9]/.test(input)) {
        error_obj[item_name] = `Error: ${name} cannot contain any numbers.`;
    } else if (/<[^>]+>/i.test(input)) {
        error_obj[item_name] = `Error: Invalid input for ${name}. No HTML elements are allowed.`;
    } else if (input.length < min_length) {
        error_obj[item_name] = `Error: ${name} must be at least ${min_length} characters long.`;
    } else if (input.length > max_length) {
        error_obj[item_name] = `Error: ${name} must be at most ${max_length} characters long.`;
    }
}

function dateCheck(input, item_name, name, error_obj) {
    if (input === "") { return; }
    else if (typeof input !== "string") {
        error_obj[item_name] = `Error: Invalid input for ${name}.`;
    } else if (/<[^>]+>/i.test(input)) {
        error_obj[item_name] = `Error: Invalid input for ${name}. No HTML elements are allowed.`;
    } else if (!/^\d\d\d\d\-\d\d\-\d\d$/.test(input)) {
        error_obj[item_name] = `Error: ${name} must be in YYYY-MM-DD format.`;
    }
}

$('#closeNewApp').on("click", (event) => {
    event.preventDefault();

    $("#newAppModal").hide();
});

$('#newAppButton').on("click", (event) => {
    event.preventDefault();

    $("#newAppModal").show();
});

$('#deleteAppButton').on("click", (event) => {
    event.preventDefault();
    if (!window.confirm("Are you sure you want to delte this application?")) { return; };
    
    let requestConfig = {
        method: 'DELETE',
        url: "/api" + window.location.pathname
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.success) { window.location.replace("/dashboard"); }
        else { alert(responseMessage.error); }
    });
});

$("#newAppForm").submit((event) => {
    //Get all error message placeholders
    let companyNameError = $("#companyName + span.form-error");
    let jobPositionError = $("#jobPosition + span.form-error");
    let appCityError = $("#appCity + span.form-error");
    let appStateError = $("#appState + span.form-error");
    let followUpDateError = $("#followUpDate + span.form-error");
    let appResumeError = $("#appResume + span.form-error");
    let statusError = $("#status + span.form-error");
    
    //Reset error messages
    companyNameError.html("");
    jobPositionError.html("");
    appCityError.html("");
    appStateError.html("");
    followUpDateError.html("");
    appResumeError.html("");
    statusError.html("");
  
    // Errors Object
    let errors = {};
  
    // Validate Company Name
    let companyName = $("#companyName").val().trim();
    inputCheck(companyName, "companyName", "Company Name", 2, 25, errors);
  
    // Validate Job Position
    let jobPosition = $("#jobPosition").val().trim();
    inputCheck(jobPosition, "jobPosition", "Job Position", 2, 25, errors);
  
    // Validate App City
    let appCity = $("#appCity").val().trim();
    inputCheck(appCity, "appCity", "Application City", 3, 30, errors);
  
    // Validate State
    let appState = $("#appState").val().trim();
    stateCheck(appState, "appState", "Application State", errors);

    // Validate State
    let followUpDate = $("#followUpDate").val().trim();
    dateCheck(followUpDate, "followUpDate", "Follow-Up Date", errors);

    // Validate Status
    let status = $("#status").val().trim();
    const statuses = ["Saved", "Applied", "Screening", "Interviewing", "Hired", "Rejected"];
    if (!statuses.includes(status)) { errors.status = `Status must be one of the following: ${statuses.join(", ")}`; }
    
    console.log(errors);
    if (Object.keys(errors).length !== 0) {
        event.preventDefault();
        if (errors.companyName) { companyNameError.html(errors.companyName); }
        if (errors.jobPosition) { jobPositionError.html(errors.jobPosition); }
        if (errors.appCity) { appCityError.html(errors.appCity); }
        if (errors.appState) { appStateError.html(errors.appState); }
        if (errors.followUpDate) { followUpDateError.html(errors.followUpDate); }
        if (errors.status) { statusError.html(errors.status); }
    }
});
  