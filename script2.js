document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    const products = [
        { id: 'appleQty', name: 'Apple', pricePerUnit: 3 },
        { id: 'berryQty', name: 'Berry', pricePerUnit: 5 },
        { id: 'orangeQty', name: 'Orange', pricePerUnit: 7 },
        { id: 'melonQty', name: 'Melon', pricePerUnit: 9 },
        { id: 'pearQty', name: 'Pears', pricePerUnit: 10 },
        { id: 'grapeQty', name: 'Grapes', pricePerUnit: 5 },
        { id: 'carrotQty', name: 'Carrot', pricePerUnit: 2 },
        { id: 'beetQty', name: 'Beet', pricePerUnit: 6 },
        { id: 'brinjalQty', name: 'Brinjal', pricePerUnit: 12 },
        { id: 'pumpkinQty', name: 'Pumpkin', pricePerUnit: 10 },
        { id: 'pepperQty', name: 'Pepper', pricePerUnit: 9 },
        { id: 'radishQty', name: 'Radish', pricePerUnit: 20 },
        { id: 'milkQty', name: 'Milk', pricePerUnit: 1.5 },
        { id: 'cheeseQty', name: 'Cheese', pricePerUnit: 15 },
        { id: 'powderQty', name: 'Milk Powder', pricePerUnit: 10 },
        { id: 'margareneQty', name: 'Margarene', pricePerUnit: 25 },
        { id: 'creamQty', name: 'Ice-Cream', pricePerUnit: 35 },
        { id: 'butterQty', name: 'Butter', pricePerUnit: 5 },
        { id: 'chickenQty', name: 'Chicken', pricePerUnit: 75 },
        { id: 'fishQty', name: 'Fish', pricePerUnit: 85 },
        { id: 'squidQty', name: 'Squid', pricePerUnit: 450 },
        { id: 'tunaQty', name: 'Tuna', pricePerUnit: 150 },
        { id: 'salmonQty', name: 'Salmon', pricePerUnit: 100 },
        { id: 'crabQty', name: 'Crab', pricePerUnit: 250 },
        { id: 'flourQty', name: 'Flour', pricePerUnit: 130 },
        { id: 'yeastQty', name: 'Yeast', pricePerUnit: 150 },
        { id: 'sugarQty', name: 'Sugar', pricePerUnit: 200 },
        { id: 'saltQty', name: 'Salt', pricePerUnit: 75 },
        { id: 'oilQty', name: 'Cooking Oil', pricePerUnit: 150 },
        { id: 'spiceQty', name: 'Spices', pricePerUnit: 300 },
    ];

    document.getElementById('buy-now').addEventListener('click', () => {
        calculateCart();
        window.location.href = 'checkout.html';
    });

    document.getElementById('save-favorites').addEventListener('click', () => {
        localStorage.setItem('favorites', JSON.stringify(cartItems));
        alert('Favorites saved!');
    });

    document.getElementById('apply-favorites').addEventListener('click', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        cartItems.length = 0;
        favorites.forEach(item => cartItems.push(item));
        updateCart();
    });

    function calculateCart() {
        cartItems.length = 0;
        let totalPrice = 0;

        products.forEach(product => {
            const qty = parseFloat(document.getElementById(product.id).value) || 0;
            if (qty > 0) {
                const itemTotal = qty * product.pricePerUnit;
                totalPrice += itemTotal;
                cartItems.push({ name: product.name, qty, itemTotal });
            }
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name}: ${item.qty} - $${item.itemTotal.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Initial cart calculation
    calculateCart();
});

