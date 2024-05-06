let allCompanies;
let companyNameField = document.getElementById("companyName");
let list = document.getElementById("result-box");

const loadContent = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/companies/companyNames`
    );
    allCompanies = data.data;
  } catch (error) {
    console.error(error.message);
  }
};

document.addEventListener("DOMContentLoaded", loadContent);

companyNameField.onkeyup = function () {
  let result = [];
  let inputText = companyNameField.value;
  if (inputText.length) {
    result = allCompanies.filter((keyword) => {
      return keyword.toLowerCase().includes(inputText.toLowerCase());
    });
    // console.log(result);
  }
  display(result);
};

const display = (result) => {
  const content = result.map((item) => {
    return `<li onclick=addSeclectedItemToInput(this)>${item}</li>`;
  });

  list.innerHTML = content.join("");
};

const addSeclectedItemToInput = (item) => {
  companyNameField.value = item.innerHTML;
  list.innerHTML = "";
};
