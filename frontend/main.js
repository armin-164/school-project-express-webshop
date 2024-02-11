import './style.scss';
import displayHomepage from './scripts/homepage';
import initializeLoginHandler from './scripts/popupForm';
import { displayCart } from './scripts/cartManager';
import sendOrder from './scripts/ordersManager';
import formIsValid from './scripts/formValidation';

const headerTitle = document.querySelector('h1');
const cartIcon = document.getElementById('user-cart');

headerTitle.addEventListener('click', displayHomepage);
cartIcon.addEventListener('click', () => {
  // I have added a promise to ensure that submitBtn exists
  // after completing displayCart before retrieving it
  new Promise((res) => {
    displayCart();
    res();
  }).then(() => {
    const submitBtn = document.querySelector('.submit-order');
    submitBtn.addEventListener('click', (event) => {
      // Stop it from refreshing page
      event.preventDefault();

      // If form is not valid, stop the function.
      if (!formIsValid('order')) {
        return;
      }
      sendOrder();
    });

    const resetBtn = document.querySelector('.reset-order');
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('orderData');
      displayHomepage();
    });
  });
});

initializeLoginHandler();
displayHomepage();
