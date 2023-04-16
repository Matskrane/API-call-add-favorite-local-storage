const API_URL = 'https://dummyjson.com/products?limit=6';
const list_Products = document.querySelector('.products');

async function getProducts() {

    const response = await fetch(API_URL);
    const products = await response.json();
    console.log(products);
    

    list_Products.innerHTML += `
      <div class="result">
        <h3>${products.title}</h3>
      </div>
    `;
}


getProducts();

