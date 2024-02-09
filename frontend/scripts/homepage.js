import addToCart from './cartManager';

const mainDiv = document.querySelector('.main-content');

function createHomepageElements(array) {
  mainDiv.innerHTML = '';

  const productsContainer = document.createElement('div');
  productsContainer.classList.add('product-container');

  array.forEach((product) => {
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

    productCard.append(placeholderImg, productNameElement, addToCartButton, moreButton);
    productsContainer.appendChild(productCard);
  });

  mainDiv.appendChild(productsContainer);
}

function displayHomepage() {
  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => createHomepageElements(data));
}

export default displayHomepage;
