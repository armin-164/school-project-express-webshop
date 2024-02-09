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

export default addToCart;
