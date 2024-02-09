function addToCart(event) {
  // Find name of the clicked product
  const clickedProduct = event.target.parentNode.querySelector('h4').innerText;

  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((allProducts) => {
      const loggedInUser = localStorage.getItem('user');

      // Check if user is not logged in
      if (!loggedInUser) {
        return alert('You must login before adding to cart!');
      }

      // Find the relevant product in the database
      const product = allProducts.find((obj) => clickedProduct == obj.name);

      // Check if product exists
      if (product) {
        // Check if stock is available
        if (product.quantity < 1) {
          return alert('We do not have more of this product');
        }

        // Convert the orderData item into a JS object and assign it to a variable
        let orderData = JSON.parse(localStorage.getItem('orderData'));

        // If there isn't an orderData item, create one
        if (!orderData) {
          orderData = {
            user: loggedInUser,
            products: [],
          };
        }

        const existingProduct = orderData.products.find(
          (item) => item.productId == product._id,
        );

        // If the product exists in the orderData, just increase the quantity
        // Otherwise push a new object with required properties
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          orderData.products.push({
            name: product.name,
            productId: product._id,
            quantity: 1,
            price: product.price,
          });
        }

        // Update the orderData
        localStorage.setItem('orderData', JSON.stringify(orderData));
      }
    });
}

function displayOrderForm() {
  const orderForm = document.createElement('div');
  orderForm.classList.add('order-form');

  orderForm.innerHTML = `
  <h2>Order Form</h2>
  <form id="orderForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" class="order-name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" class="order-email" required>
    <label for="address">Address:</label>
    <input type="text" id="address" name="address" class="order-address" required>
    <label for="phone">Phone:</label>
    <input type="tel" id="phone" name="phone" class="order-phone" required>
    <div class="buttons">
      <button class="submit-order" type="submit">Submit</button>
      <button class="reset-order" type="reset">Reset</button>
    </div>
  </form>
`;

  return orderForm;
}

function displayCart() {
  const mainDiv = document.querySelector('.main-content');
  mainDiv.innerHTML = '';

  const orderData = JSON.parse(localStorage.getItem('orderData'));

  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  if (orderData && orderData.products.length > 0) {
    let totalSum = 0;

    orderData.products.forEach((product) => {
      const row = document.createElement('div');
      row.classList.add('cart-row');
      row.innerHTML = `
        <div class="product-name">${product.name}</div>
        <div class="quantity">${product.quantity}</div>
      `;
      cartContainer.appendChild(row);

      // Add the price to the totalSum
      totalSum += product.price * product.quantity;
    });

    const totalSumElement = document.createElement('div');
    totalSumElement.classList.add('total-sum');
    totalSumElement.textContent = `Total: $${totalSum}`;
    cartContainer.appendChild(totalSumElement);
  } else {
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.textContent = 'Your cart is empty.';
    cartContainer.appendChild(emptyCartMessage);
  }

  mainDiv.append(cartContainer, displayOrderForm());
}

export { addToCart, displayCart };
