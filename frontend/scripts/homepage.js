const mainDiv = document.querySelector('.main-content');

function createHomepageElements(array) {
  mainDiv.innerHTML = '';

  const productsContainer = document.createElement('div');
  productsContainer.classList = 'product-container';

  array.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList = 'product-card';

    const placeholderImg = document.createElement('img');
    placeholderImg.classList = 'product-img';
    placeholderImg.src = '../assets/placeholder.jpg';

    const productNameElement = document.createElement('h4');
    productNameElement.innerText = product.name;

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Add to cart';

    const moreButton = document.createElement('button');
    moreButton.innerText = 'More';

    productCard.append(placeholderImg, productNameElement, addToCartButton, moreButton);
    productsContainer.appendChild(productCard);
  });

  mainDiv.appendChild(productsContainer);
}
