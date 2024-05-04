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
       
        let websiteUrl = companyData.Website;
        // Check if the website URL contains the protocol
        if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
            // If not, prepend 'http://' (you might need to check if 'https://' is needed)
            websiteUrl = 'http://' + websiteUrl;
        }

        let modalHTML = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <h2>${companyData.company}</h2>
                    <p class="mb-1">Sector: ${companyData.sector}</p>
                    <p class="mb-1">Location: ${companyData.city}, ${companyData.state}</p>
                    <p class="mb-1">CEO: ${companyData.CEO}</p>
                    <p class="mb-1">Website: <a href="${websiteUrl}" target="_blank">${companyData.Website}</a></p>
                </div>
                <div class="col-md-6">
                    <img src="https://logo.clearbit.com/${companyData.Website}" alt="Company Logo" class="img-fluid">
                </div>
            </div>
        </div>
    `;

        modalContent.innerHTML = modalHTML;

        companyModal.show();
    });
});

document.getElementById('closeNewApp').addEventListener('click', (event) => {
    event.preventDefault();
    companyModal.hide();
});

