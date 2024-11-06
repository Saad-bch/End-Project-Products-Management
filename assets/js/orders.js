const ordersObj = JSON.parse(localStorage.getItem('orders')) || [];

window.onload = function () {
    displayOrders();
};

console.log(ordersObj);

function displayOrders() {
    const orderItem = document.querySelector("#orders-items");
    orderItem.innerHTML = '' ;

    ordersObj.forEach((order , index) => {
        const totaalAmount = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
        const row = document.createElement('tr');

        row.innerHTML = `
        <tr>
            <td>${index + 1 }</td>
            <td>€${totaalAmount.toFixed(2)}</td>
            <td>${order.date}</td>
          </tr>
        `;

        orderItem.appendChild(row);
    })

}



