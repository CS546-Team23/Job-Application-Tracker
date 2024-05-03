
// function validateId(id){
//     isInputProvided(id, "id");
//     id = checkIsProperString(id, "id");
  
//     if (!ObjectId.isValid(id)) throw new Error(`Error: Invalid object Id`);
  
//     return id;
//   };

// function isInputProvided(variable, variableName){
//     if (variable === undefined || variable === null)
//       throw new Error(`Error: ${variableName || "variable"} not provided`);
//   };
  
// function checkIsProperString(str, strName){
//     isInputProvided(str, strName);
//     if (typeof str !== "string")
//       throw new Error(`Error: ${strName || "provided variable"} is not a string`);
//     str = str.trim();
//     if (str.length === 0)
//       throw new Error(
//         `Error: ${strName || "provided variable"} is a empty string`
//       );
//     return str;
//   };


  
let companyLinks = document.querySelectorAll(".company-link");

companyLinks.forEach(function(companyLink) {
    companyLink.addEventListener("click", async function(event) {
        // Prevent the default behavior
        event.preventDefault();

        // Access the value of the data-id attribute
        let companyId = companyLink.getAttribute("data-id");
        //companyId = validateId(companyId);
        let response = await axios.get(`companies/${companyId}`);
        let companyData = response.data;
        console.log(companyData);

        const modalId = `modal-${companyId}`;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.querySelector(".modal-content").innerHTML = `
                        <span class="close">&times;</span>
                        <h2>${companyData.company}</h2>
                        <p><strong>Sector:</strong> ${companyData.sector}</p>
                        <p><strong>Revenue:</strong> ${companyData.revenue}</p>
                        <!-- Add more fields as needed -->
                    `;
                    modal.style.display = 'block';

                    // Close modal when close button is clicked
                    const closeButton = modal.querySelector('.close');
                    closeButton.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                }

    });
});


