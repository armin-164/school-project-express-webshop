function sendOrder() {
  const orderData = JSON.parse(localStorage.getItem('orderData'));
  const allProducts = [];

  if (!orderData) {
    return alert('Your cart is empty');
  }

  orderData.products.forEach((obj) => {
    allProducts.push({
      productId: obj.productId,
      quantity: obj.quantity,
    });
  });

  const order = {
    user: localStorage.getItem('user'),
    products: allProducts,
  };

  fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((availableProducts) => {
      order.products.forEach((orderedProduct) => {
        const foundProduct = availableProducts.find(
          (p) => p._id.toString() === orderedProduct.productId,
        );

        const availableStock = foundProduct.lager - orderedProduct.quantity;

        if (availableStock < 0) {
          throw new Error(
            `We only have ${foundProduct.lager} ${foundProduct.name}(s) left, please reset your cart and order again`,
          );
        }
      });

      fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
    })
    .catch((err) => alert(err));
}

function displayPreviousOrders() {
  const user = localStorage.getItem('user');

  fetch('http://localhost:3000/api/orders/all/1234key1234')
    .then((res) => res.json())
    .then((orders) => {
      const mainDiv = document.querySelector('.main-content');
      mainDiv.innerHTML = '';

      const myOrdersDiv = document.createElement('div');
      myOrdersDiv.classList.add('my-orders');

      myOrdersDiv.innerHTML = '<h2>My Previous Orders</h2>';

      // Fetch products to get a hold of product name and price (to show total price)
      fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((availableProducts) => {
          orders.forEach((order) => {
            if (order.user == user) {
              const orderRow = document.createElement('div');
              orderRow.classList.add('order-row');

              let totalPrice = 0;

              order.products.forEach((orderedProduct) => {
                const product = availableProducts.find(
                  (prod) => prod._id.toString() === orderedProduct.productId,
                );

                if (product) {
                  const productTotalPrice = product.price * orderedProduct.quantity;
                  totalPrice += productTotalPrice;

                  const productInfo = document.createElement('p');
                  productInfo.textContent = `Product: ${product.name}, Quantity: ${orderedProduct.quantity}, Total Price: ${productTotalPrice}`;
                  orderRow.appendChild(productInfo);
                }
              });

              const totalPriceInfo = document.createElement('p');
              totalPriceInfo.textContent = `Total Price: ${totalPrice}$`;
              orderRow.appendChild(totalPriceInfo);

              myOrdersDiv.appendChild(orderRow);
            }
          });
        });

      mainDiv.appendChild(myOrdersDiv);
    });
}

export { sendOrder, displayPreviousOrders };
