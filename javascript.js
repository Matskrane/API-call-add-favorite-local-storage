const list_Products = document.querySelector('.products');
const API_URL = 'https://dummyjson.com/products?limit=6';

// Gets the users favorites array from local storage and if it doesnt creates an empty array instead.
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch products from the API
async function getProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    console.log(products.products);
    createProducts(products.products);
  } catch (error) {
    console.log(error);
  }
}

// Create HTML elements for each product and add them to the DOM
function createProducts(products) {
  const list_Products = document.querySelector('.products');
  
  products.forEach(function (product) {
    const isFavorite = favorites.some((favProduct) => favProduct.title === product.title);
    const buttonClass = isFavorite ? "favorite-button added" : "favorite-button";
    list_Products.innerHTML += `
      <div tabindex="0" class="products-container">
        <img src='${product.thumbnail}'></img>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <span>${product.price} Kroner</span>
          <button tabindex="0"      
            class="${buttonClass}"
            data-title="${product.title}"
            data-price="${product.price}"
            data-image_url="${product.thumbnail}"
          > Add to Favorites
            <svg class="after" style="${isFavorite ? 'display: block' : 'display: none'}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" fill="red"></path> </svg>
          </button>
        </div>
      </div>
    `;
  });

  // adds event listener to each button
  const addToFavoriteButton = document.querySelectorAll(".favorite-button");

  addToFavoriteButton.forEach((button) => {
    button.addEventListener("click", addToLocalStorage);
  });
  
}

// Add or remove a product from the favorites list stored in local storage
function addToLocalStorage() {
  const image_url = this.dataset.image_url;
  const title = this.dataset.title;
  const price = this.dataset.price;

  const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const productIndex = currentFavorites.findIndex((product) => product.title === title);

  if (productIndex === -1) {
    const product = { title: title, price: price, image_url: image_url };
    currentFavorites.push(product);
    this.classList.add("added");
    this.querySelector(".after").style.display = "block";
    alert("Successfully added to favorites");
  } else {
    currentFavorites.splice(productIndex, 1);
    this.classList.remove("added");
    this.querySelector(".after").style.display = "none";
    alert("Product removed from favorites");
  }

  localStorage.setItem("favorites", JSON.stringify(currentFavorites));
}

getProducts();




// Since i didn't finish everytask the next step would be: 
// 1: Create a function which removes the "add to favorites button" or do it using ccs if possible
// 2: Make it so when u tab trough the products with ARIA u can select the button without using the mouse
