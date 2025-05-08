//document.querySelectorAll('.productbtns button').forEach(button => {
      //  button.addEventListener('click', () => 
      //      {
       //     alert('Added to cart!');
       //     });
       // });

        const products = [
            { name: "Heineken", category: "beer", price: "$12.99/6pk", imageUrl: "https://images.albertsons-media.com/is/image/ABS/960085410-C1N1?$ng-ecom-pdp-mobile$&defaultImage=Not_Available" },
            { name: "Bud Light", category: "beer", price: "$6.99/6pk", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C1-_o8BzdziEJKQws3E6HKa0CwrnrvvgOw&s" },
            { name: "Apothic Red", category: "wine", price: "$13.49/750ml", imageUrl: "https://i5.walmartimages.com/seo/Apothic-Red-Blend-Wine-California-750ml-Glass-Bottle-13-5-ABV_1420908f-13d1-4e19-ab6c-c08329415f97.77a3c70670c9971d677945869ab9cef9.jpeg" },
            { name: "Barefoot White", category: "wine", price: "$6.99/750ml", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjsC9_oxFLBd7x43oK9GdNNSGmgzliX-Ylw&s" },
            { name: "Jack Daniel's Whiskey", category: "spirits", price: "$16.99/750ml", imageUrl: "https://cwspirits.com/cdn/shop/files/jack-daniel-s-whiskey-750-ml-country-wine-and-spirits.png?v=1718355493" },
            { name: "Stoli Vodka", category: "spirits", price: "$15.99/750ml", imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQERMQEhIWEw8QGRgTFhUVEBAQFhgXFRcYFhURFhYYHSggGBomGxUWITEhJSkrLi4uGB8/ODMsNygtLisBCgoKDg0OGxAQGismHyAtKy03Ly0tLS0tLS0tLS4tLS0tLS0uLS0tMC0tNzUrLS0tMS01LTUxLS0wLTctNy0rLf/AABEIAOEA4QMBIgACEQEDEQH..." }
    ];

    // Get the search input and button
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');

    document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');

    // Function to save the cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Function to update the cart count in the UI
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    // Function to render the cart dynamically
    function renderCart() {
        if (!cartItemsContainer) return; // Skip if cart container is not present
        cartItemsContainer.innerHTML = ""; // Clear the cart container

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
                <button data-id="${item.id}" class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update the total amount
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (totalAmountSpan) totalAmountSpan.textContent = total.toFixed(2);

        updateCartCount(); // Update the cart count in the header
    }

    // Function to handle quantity updates
    function updateQuantity(id, newQuantity) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
            renderCart();
        }
    }

    // Function to remove an item from the cart
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }

    // Attach event listeners for cart functionality
    if (cartContainer) {
        cartContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('item-quantity')) {
                const id = event.target.getAttribute('data-id');
                const newQuantity = parseInt(event.target.value, 10);
                if (newQuantity > 0) {
                    updateQuantity(id, newQuantity);
                }
            }
        });

        cartContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const id = event.target.getAttribute('data-id');
                removeItem(id);
            }
        });
    }

    // Function to add an item to the cart
    function addToCart(event) {
        const button = event.target;
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price").replace(/[^0-9.]/g, '')); // Clean price
        const id = button.getAttribute("data-id");
        const quantityInput = button.closest(".product").querySelector("input[type='number']");
        const quantity = parseInt(quantityInput.value, 10);

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if item exists
        } else {
            cart.push({ id, name, price, quantity }); // Add new item to the cart
        }

        saveCart();
        updateCartCount();
        alert(`${name} added to cart!`);
    }

    // Function to display products dynamically
    function displayProducts(products) {
        // Clear each category section
        const beerSection = document.querySelector('#beer + .category');
        const wineSection = document.querySelector('#wine + .category');
        const spiritsSection = document.querySelector('#spirits + .category');

        if (beerSection) beerSection.innerHTML = "";
        if (wineSection) wineSection.innerHTML = "";
        if (spiritsSection) spiritsSection.innerHTML = "";

        // Render products in their respective categories
        products.forEach(product => {
            const productHTML = `
                <div class="product">
                    <div class="image-placeholder">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <div class="qyt">
                        <label for="quantity_${product.name.replace(/\s+/g, '')}">Quantity:</label>
                        <input type="number" id="quantity_${product.name.replace(/\s+/g, '')}" value="1">
                    </div>
                    <div class="productbtns">
                        <button class="add-to-cart"
                            data-id="${product.name.replace(/\s+/g, '')}"
                            data-name="${product.name}"
                            data-price="${product.price.replace(/[^0-9.]/g, '')}"
                        >Add to Cart</button>
                        <button class="buy-now">Buy Now</button>
                    </div>
                </div>
            `;

            // Append the product to the correct category section
            if (product.category === "beer" && beerSection) {
                beerSection.insertAdjacentHTML('beforeend', productHTML);
            } else if (product.category === "wine" && wineSection) {
                wineSection.insertAdjacentHTML('beforeend', productHTML);
            } else if (product.category === "spirits" && spiritsSection) {
                spiritsSection.insertAdjacentHTML('beforeend', productHTML);
            }
        });

        // Attach event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Function to filter products based on search input
    function filterProducts() {
        const query = document.querySelector('.search input').value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    }

    function filterByCategory(category) {
        if (category === "all") {
            displayProducts(products); // Show all products
        } else {
            const filteredProducts = products.filter(product => product.category === category);
            displayProducts(filteredProducts); // Show only products in the selected category
        }
    }

    // Attach search functionality
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', filterProducts);
        searchInput.addEventListener('input', filterProducts);
    }

    // Display all products initially
    displayProducts(products);

    // Update cart count on page load
    updateCartCount();

    // Render the cart on page load
    renderCart();
});


    function validateForm() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    
        if (email === "") {
            alert("Email is required");
            return false;
        } 
        else if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
    
        if (password === "") {
            alert("Password is required");
            return false;
        } 
    
        // AJAX call to the server to check credentials
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Successfully logged in') {
                alert('Successfully logged in');
                // Redirect to another page or perform other actions here
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Server error');
        });
    
        return false; // Prevent form submission
    }


    document.addEventListener('DOMContentLoaded', () => {
        const cartContainer = document.getElementById('cart-container');
        const cartItemsContainer = document.getElementById('cart-items');
        const totalAmountSpan = document.getElementById('total-amount');
    
        // Hard codded cart items
        let cartItems = [
            { id: 1, name: 'Heineken', price: 12.99, quantity: 1 },
            { id: 2, name: 'Bud Light', price: 6.99, quantity: 2 },
            { id: 3, name: 'Apothic Red', price: 13.49, quantity: 1 }
        ];
    
        function renderCart() {
            cartItemsContainer.innerHTML = ''; 
    
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
                    <button data-id="${item.id}" class="remove-item">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
    
            updateTotal();
        }
    
        function updateTotal() {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalAmountSpan.textContent = total.toFixed(2);
        }
    
        function updateQuantity(id, newQuantity) {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                renderCart();
            }
        }
    
        function removeItem(id) {
            cartItems = cartItems.filter(item => item.id !== id);
            renderCart();
        }
    
        cartContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('item-quantity')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    updateQuantity(id, newQuantity);
                }
            }
        });
    
        cartContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                removeItem(id);
            }
        });
    
        renderCart(); // Initial render
    });


    document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

});
