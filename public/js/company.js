// Get all elements with the class "company-link"
var companyLinks = document.querySelectorAll(".company-link");

companyLinks.forEach(function(companyLink) {
    companyLink.addEventListener("click", async function(event) {
        // Prevent the default behavior
        event.preventDefault();

        // Access the value of the data-id attribute
        var companyId = companyLink.getAttribute("data-id");

        // Your code to handle the click event goes here
        console.log("Link clicked, but default behavior prevented!");
        console.log("Company ID:", companyId);
    });
});
