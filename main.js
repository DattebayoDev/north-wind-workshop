function displayDropDown() {
  const mainDropDown = document.getElementById("mainDropDown");
  const displayDropDown = document.getElementById("hiddenDropDown");
  const gridDisplay = document.getElementById("gridDisplay");
  mainDropDown.addEventListener("change", (element) => {
    if (element.target.value === "Search By Category") {
      displayDropDown.classList.remove("hide-display");
      //   gridDisplay.classList.add("hide-display");
    } else if (element.target.value === "View All") {
      gridDisplay.classList.remove("hide-display");
      displayDropDown.classList.add("hide-display");
    } else {
      displayDropDown.classList.add("hide-display");
      gridDisplay.classList.add("hide-display");
    }
  });
}
displayDropDown();

async function populateDropDown() {
  const data = await getCategories();
  const dropdown = document.querySelector("#hiddenDropDown");
  data.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category.name;
    dropdown.appendChild(option);
  });
}
selectDropDown();
function selectDropDown() {
  const displayDropDown = document.getElementById("hiddenDropDown");
  displayDropDown.addEventListener("change", (element) => {
    getID(element.target.value);
  });
}
populateDropDown();

async function getID(name) {
  const data = await getCategories();
  const result = data.filter((category) => category.name === name);
  result.forEach((element) => {
    id = element.categoryId;
    displayCardIds(id);
  });
}

function displayCardIds(id) {
  const productCard = document.querySelectorAll(".categoryId");
  console.log(id);
  productCard.forEach((product) => {
    parentCard = product.closest(".product-card");
    parentCard.classList.remove("hide-display");

    if (product.textContent !== id) {
      parentCard.classList.add("hide-display");
    } else {
    }
  });
}

async function getCategories() {
  const response = await fetch("http://localhost:8081/api/categories");
  const data = await response.json();
  return data;
}

async function getProductData() {
  const response = await fetch("http://localhost:8081/api/products");
  const data = await response.json();
  return data;
}

async function viewData() {
  const data = await getProductData();
}
// viewData()

function cloneCard() {
  const productCard = document.querySelector(".product-card");
  const emptyCard = productCard.cloneNode(true);
  return emptyCard;
}

createCard();
async function createCard() {
  const data = await getProductData();
  const productContainer = document.querySelector(".products-grid");
  data.forEach((product) => {
    productContainer.appendChild(populateCard(cloneCard(), product));
  });
}

function populateCard(emptyCard, product) {
  const productName = emptyCard.querySelector(".product-name");
  const productCard = productName.closest(".product-card");
  productCard.classList.remove("hide-display");
  const productSupplier = emptyCard.querySelector(".product-supplier");
  const price = emptyCard.querySelector(".price");
  const categoryId = emptyCard.querySelector(".categoryId");
  const anchor = emptyCard.querySelector(".btn");
  anchor.href = "details.html";

  productName.textContent = product.productName;
  productSupplier.textContent = product.productSupplier;
  price.textContent = product.price;
  categoryId.textContent = product.categoryId;

  return emptyCard;
}
