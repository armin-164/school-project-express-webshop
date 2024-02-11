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

        fetch('http://localhost:3000/api/orders/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
      });
    })
    .catch((err) => alert(err));
}

export default sendOrder;
