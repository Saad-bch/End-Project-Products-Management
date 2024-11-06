let cart = JSON.parse(localStorage.getItem('cart')) || [];
window.onload = function () {
    updateCartView();
};

//ADD TO CART
function addToCart(id) {
    const product = getProductById(id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    // updateCartView();
    localStorage.setItem('cart', JSON.stringify(cart));
    location.href="/cart.html";
}

// Display badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if (cart.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

// Update cart
function updateCartView() {
    const cartItems = document.getElementById('cart-items');

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <tr>
            <td>${item.name}</td>
            <td>€${item.price}</td>
            <td>${item.quantity}</td>
            <td>€${(item.price * item.quantity)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button></td>
          </tr>
        `;
        cartItems.appendChild(row);
    });

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-total').innerText = `Total: €${totalAmount.toFixed(2)}`;
}

//Remove Product

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartView();
}

//checkout

document.getElementById('checkout-btn').onclick = function () {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before checking out.');
    } else {

        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        orders.push({
            items: [...cart],
            date: new Date().toLocaleString()
        });
        localStorage.setItem('orders', JSON.stringify(orders));
         cart = [];
         localStorage.setItem('cart', JSON.stringify(cart));

         document.querySelector('.cart-container').style.display = 'none';
         document.getElementById('checkout-btn').style.display = 'none';

         const checkOutMessage = document.createElement('div');
         checkOutMessage.style.textAlign = 'center';
         checkOutMessage.style.fontSize = '2.5em';
         checkOutMessage.style.marginTop = '40px';
         checkOutMessage.innerText = 'Dakjewel voor je bestelling';

         document.getElementById('cart').appendChild(checkOutMessage);
    }
}



