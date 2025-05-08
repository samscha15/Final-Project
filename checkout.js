document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const card = document.getElementById("card").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Basic validation
    if (!name || !email || !address || !card || !expiry || !cvv) {
        alert("Please fill out all fields.");
        return;
    }

    if (card.length !== 16 || isNaN(card)) {
        alert("Please enter a valid 16-digit credit card number.");
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return;
    }

    // Success message
    alert("Purchase completed successfully!");
    window.location.href = "alcWebsite.html"; // Redirect to the homepage
});