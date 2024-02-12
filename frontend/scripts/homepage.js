import { addToCart } from './cartManager';
import moreProductInfo from './productInfo';

const mainDiv = document.querySelector('.main-content');

function updateProductDisplay(products) {
  let productsContainer = document.querySelector('.product-container');

  // If products container doesn't exist, create it
  if (!productsContainer) {
    productsContainer = document.createElement('div');
    productsContainer.classList.add('product-container');
    mainDiv.appendChild(productsContainer);
  } else {
    // Clear the product container before adding new products
    productsContainer.innerHTML = '';
  }

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const placeholderImg = document.createElement('img');
    placeholderImg.classList.add('product-img');
    placeholderImg.src = '../assets/placeholder.jpg';

    const productNameElement = document.createElement('h4');
    productNameElement.innerText = product.name;

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.innerText = 'Add to cart';
    addToCartButton.addEventListener('click', addToCart);

    const moreButton = document.createElement('button');
    moreButton.classList.add('more-button');
    moreButton.innerText = 'More';
    moreButton.addEventListener('click', moreProductInfo);

    productCard.append(
      placeholderImg,
      productNameElement,
      addToCartButton,
      moreButton,
    );
    productsContainer.appendChild(productCard);
  });
}

function createHomepageElements(array) {
  mainDiv.innerHTML = '';

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('select-container');

  const selectElement = document.createElement('select');
  selectElement.addEventListener('change', () => {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = ''; // Empty the product container
    const selectedCategory = selectElement.value;
    const filteredProducts = array.filter((product) => product.category === selectedCategory);
    updateProductDisplay(filteredProducts);
  });

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Category'; 
  selectElement.appendChild(defaultOption);

  fetch('http://localhost:3000/api/categories')
    .then((res) => res.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        selectElement.appendChild(option);
      });

      selectContainer.appendChild(selectElement);
      mainDiv.appendChild(selectContainer);

      updateProductDisplay(array);
    });
}

function displayHomepage() {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => createHomepageElements(data));
}

export default displayHomepage;
