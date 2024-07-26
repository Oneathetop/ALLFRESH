document.addEventListener('DOMContentLoaded', () => {
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
  const orderSummary = document.getElementById('order-summary');

  if (orderDetails) {
      const items = orderDetails.items.map(item => `<li>${item.name} - ${item.quantity} - $${item.total.toFixed(2)}</li>`).join('');
      orderSummary.innerHTML = `<h2>Your Order</h2><ul>${items}</ul><p>Total: ${orderDetails.total}</p>`;
  }

  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(checkoutForm);
      const customerDetails = Object.fromEntries(formData.entries());

      if (validateForm(customerDetails)) {
          alert(`Thank you for your purchase! Your order will be delivered on ${getDeliveryDate()}.`);
          localStorage.removeItem('orderDetails');
          checkoutForm.reset();
      }
  });

  function validateForm(details) {
      return details.name && details.address && details.email && details.cardNumber;
  }

  function getDeliveryDate() {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 3); 
      return deliveryDate.toDateString();
  }
});
