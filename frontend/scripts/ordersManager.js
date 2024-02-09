function sendOrder() {
  const orderData = JSON.parse(localStorage.getItem('orderData'));
  const allProducts = [];

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

  fetch('http://localhost:3000/api/orders/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
}

export default sendOrder;
