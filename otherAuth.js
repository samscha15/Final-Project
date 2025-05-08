function validateLoginForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    if (email === "") {
        alert("Email is required");
        return false;
    } else if (!emailPattern.test(email)) {
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
            // Redirect to home page after 3 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
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

function validateRegisterForm() {
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;
    var emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    if (email === "") {
        alert("Email is required");
        return false;
    } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    if (password === "") {
        alert("Password is required");
        return false;
    }

    // AJAX call to the server to register the user
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Successfully registered') {
            alert('Successfully registered');
            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            alert('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Server error');
    });

    return false; // Prevent form submission
}