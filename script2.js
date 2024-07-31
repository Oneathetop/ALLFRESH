document.addEventListener('DOMContentLoaded', () => {
  const cartItems = [];
  const cartTable = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const addToCartButton = document.getElementById('add-to-cart');
  const addToFavouritesButton = document.getElementById('add-to-favourites');
  const applyFavouritesButton = document.getElementById('apply-favourites');
  const buyNowButton = document.getElementById('buy-now');

  // Check if elements exist
  console.log('addToCartButton:', addToCartButton);
  console.log('addToFavouritesButton:', addToFavouritesButton);
  console.log('applyFavouritesButton:', applyFavouritesButton);
  console.log('buyNowButton:', buyNowButton);

  addToCartButton.addEventListener('click', addToCart);
  addToFavouritesButton.addEventListener('click', saveToFavourites);
  applyFavouritesButton.addEventListener('click', applyFavourites);
  buyNowButton.addEventListener('click', proceedToCheckout);

  function addToCart() {
      console.log('Add to Cart button clicked');
      cartItems.length = 0;
      cartTable.innerHTML = '';

      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
          const items = section.querySelectorAll('label');
          items.forEach(item => {
              const checkbox = item.querySelector('input[type="checkbox"]');
              if (checkbox.checked) {
                  const itemName = checkbox.name;
                  const itemPrice = parseFloat(checkbox.dataset.price);
                  const quantityInput = item.querySelector('input[type="number"]');
                  const quantity = parseFloat(quantityInput.value);
                  if (quantity > 0) {
                      const itemTotal = itemPrice * quantity;
                      cartItems.push({ name: itemName, quantity: quantity, total: itemTotal });

                      const row = document.createElement('tr');
                      row.innerHTML = `<td>${itemName}</td><td>${quantity}</td><td>$${itemTotal.toFixed(2)}</td>`;
                      cartTable.appendChild(row);
                  }
              }
          });
      });

      updateTotalPrice();
  }

  function updateTotalPrice() {
      const total = cartItems.reduce((sum, item) => sum + item.total, 0);
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  function saveToFavourites() {
      console.log('Add to Favourites button clicked');
      localStorage.setItem('favourites', JSON.stringify(cartItems));
  }

  function applyFavourites() {
      console.log('Apply Favourites button clicked');
      const favourites = JSON.parse(localStorage.getItem('favourites'));
      if (favourites) {
          favourites.forEach(item => {
              const section = document.querySelector(`input[name="${item.name}"]`).closest('.section');
              const itemCheckbox = section.querySelector(`input[name="${item.name}"]`);
              const quantityInput = section.querySelector(`input[name="${item.name}Qty"]`);

              itemCheckbox.checked = true;
              quantityInput.value = item.quantity;
          });

          addToCart();
      }
  }

  function proceedToCheckout() {
      console.log('Buy Now button clicked');
      if (cartItems.length === 0) {
          alert('Add items to your cart before proceeding to checkout.');
          return;
      }

      const orderDetails = {
          items: cartItems,
          total: totalPriceElement.textContent
      };

      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
      window.location.href = 'checkout.html';
  }
});
