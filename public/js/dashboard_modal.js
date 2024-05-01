$("#newAppModal").hide();

$('#closeNewApp').on("click", (event) => {
    event.preventDefault();

    $("#newAppModal").hide();
});

$('#newAppButton').on("click", (event) => {
    event.preventDefault();

    $("#newAppModal").show();
});