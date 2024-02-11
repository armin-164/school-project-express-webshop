function moreProductInfo(event) {
  const mainDiv = document.querySelector('.main-content');
  mainDiv.innerHTML = '';

  const clickedProduct = event.target.parentNode.querySelector('h4').innerText;

  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((availableProducts) => {
      const product = availableProducts.find((p) => p.name === clickedProduct);

      if (product) {
        const productInfoDiv = document.createElement('div');

        const nameElement = document.createElement('h2');
        nameElement.textContent = `Name: ${product.name}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${product.description}`;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${product.price}`;

        const lagerElement = document.createElement('p');
        lagerElement.textContent = `Lager: ${product.lager}`;

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${product.category}`;

        productInfoDiv.append(
          nameElement,
          descriptionElement,
          priceElement,
          lagerElement,
          categoryElement,
        );

        mainDiv.appendChild(productInfoDiv);
      }
    });
}

export default moreProductInfo;
