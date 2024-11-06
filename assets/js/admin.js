let products = JSON.parse(localStorage.getItem('products')) || [];
let idCounter = parseInt(localStorage.getItem('productIdCounter')) || 7;
let editProductId = null;

// Display products
function showProducts() {
    const adminProductList = document.getElementById('admin-product-list');
    adminProductList.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>€${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-success" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="removeProduct(${product.id})">Delete</button>
            </td>
        `;
        adminProductList.appendChild(row);
    });
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.id = `product-${product.id}`;
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <h4>${product.name}</h4>
            <p>Prijs: ${product.price}</p>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productList.appendChild(productElement);
    });
}


function showAddProductForm() {
    document.getElementById("product-form-container").style.display = 'block';
    editProductId = null;
    document.getElementById("product-form").reset();
    document.getElementById("product-form-container").style.display = 'block';
}

// Add a new product to the list // or update
function addNewProduct() {
    const name = document.querySelector("#product-name").value;
    const price = document.querySelector("#product-price").value;
    const description = document.querySelector("#product-description").value;
    const image = document.querySelector("#product-image").value;

    if (!name || isNaN(price) || !description || !image) {
        alert("Please fill in all fields correctly.");
        return;
    }

    if (editProductId !== null) {
        const product = products.find(p => p.id === editProductId);
        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.image = image;
        }
        editProductId = null;
    } else {
        const newObj = {
            id: idCounter,
            name: name,
            price: price,
            description: description,
            image: image
        };
        products.push(newObj);
        idCounter++;
        localStorage.setItem('productIdCounter', idCounter);
    }

    localStorage.setItem("products", JSON.stringify(products));
    showProducts();
    displayProducts();

    document.getElementById("product-form").reset();
    document.getElementById("product-form-container").style.display = 'none';
}

// Edit product
function editProduct(id) {
    const product = products.find(pro => pro.id === id);
    if (product) {
        document.querySelector("#form-title").innerHTML = 'Edit Product';
        document.querySelector("#product-form-container").style.display = "block";
        document.querySelector("#product-name").value = product.name;
        document.querySelector("#product-price").value = product.price;
        document.querySelector("#product-description").value = product.description;
        document.querySelector("#product-image").value = product.image;

        editProductId = id ;
    }
}

// Hide product
function hideProductForm() {
    document.getElementById("product-form-container").style.display = 'none';
}

// Delete product
function removeProduct(id) {
    products = products.filter(pro => pro.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    showProducts();
}

showProducts();
displayProducts();

// localStorage.removeItem("orders");

