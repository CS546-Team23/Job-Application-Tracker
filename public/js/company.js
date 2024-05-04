let companyModal = new bootstrap.Modal(document.getElementById("companyModal"));
let modalContent = document.querySelector(".modal-body");

let companyLinks = document.querySelectorAll(".company-link");
companyLinks.forEach(function(companyLink) {
    companyLink.addEventListener("click", async function(event) {

        event.preventDefault();

       
        let companyId = companyLink.getAttribute("data-id");
     
        let response = await axios.get(`companies/${companyId}`);
        let companyData = response.data;
        console.log(companyData);

        // Clear previous modal content
        modalContent.innerHTML = "";

        let modalHTML = `
            <h2>${companyData.company}</h2>
            <p>Sector: ${companyData.sector}</p>
            <p>CEO: ${companyData.CEO}</p>
            <p>Website: ${companyData.Website}</p>
            `;

        modalContent.innerHTML = modalHTML;

        companyModal.show();
    });
});

document.getElementById('closeNewApp').addEventListener('click', (event) => {
    event.preventDefault();
    companyModal.hide();
});

