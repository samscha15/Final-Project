// Unit tests for cart functionality
function testAddToCart() {
    const cart = [];
    addToCart(cart, { id: 1, name: "Stoli Vodka", price: 15.99 });
    console.assert(cart.length === 1, "Test Failed: Item not added to cart");
    console.assert(cart[0].name === "Stoli Vodka", "Test Failed: Incorrect item added");
}

function testCalculateTotal() {
    const cart = [
        { id: 1, name: "Stoli Vodka", price: 15.99, quantity: 2 },
        { id: 2, name: "Lagunitas IPA", price: 10.99, quantity: 1 },
    ];
    const total = calculateTotal(cart);
    console.assert(total === 42.97, "Test Failed: Total calculation incorrect");
}

// Run tests
testAddToCart();
testCalculateTotal();
console.log("All unit tests passed!");