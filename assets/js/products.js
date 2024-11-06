async function getProducts() {
    if (null === localStorage.getItem('products')) {
       await reloadProducts();
    }

    return JSON.parse(localStorage.getItem('products'));
}

async function reloadProducts(callback) {
    const response = await fetch('/assets/data/producten.json');
        const data = await response.json();
        localStorage.setItem('products', JSON.stringify(data));
        if (callback) {
            callback();

        }
}

async function displayProduct() {
    try {
        const products = await getProducts();
        console.log(products);

        // localStorage.setItem('products', JSON.stringify(data));
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'col-md-4 mb-4';
            productElement.innerHTML = `
                <div class="card product-card rounded-4 ">
                    <img src="${product.image}" class="card-img-top w-100 h-100 object-fit-cover" alt="${product.name}">
                    <div class="card-body d-flex align-items-center flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">€${product.price}</p>
                        <p class="card-descrption">${product.description}</p>
                        <button class="btn btn-dark" onclick="addToCart(${product.id})">Add to Crate</button>
                    </div>
                </div>
            `;
            productList.appendChild(productElement);
        });

    } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van de producten:', error);
    }
}

function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    products = products.filter(product => product.id !== productId);

    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById(`product-${productId}`).remove();
}


function getProductById(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === id);
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found');
        return;
    }
}

displayProduct();
