document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Get Firebase Auth
            const auth = firebase.auth();

            // Sign in the user
            auth.signInWithEmailAndPassword(username, password)
                .then((userCredential) => {
                    // Successful login
                    alert('Logged in successfully!');
                    localStorage.setItem('loggedInUser', username);
                    // Redirect to home page
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error: ' + errorMessage);
                });
        });
    }

    // Handle sign-up form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const newUsername = document.getElementById('new-username').value;
            const newPassword = document.getElementById('new-password').value;

            // Get Firebase Auth
            const auth = firebase.auth();

            // Create new user
            auth.createUserWithEmailAndPassword(newUsername, newPassword)
                .then((userCredential) => {
                    // Successful sign-up
                    alert('Account created successfully!');
                    // Redirect to login page
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error: ' + errorMessage);
                });
        });
    }

    // Auto redirect if logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && !document.getElementById('login-form') && !document.getElementById('signup-form')) {
        // Redirect to home if already logged in and on login/signup page
        window.location.href = 'index.html';
    }

    // Handle ordering functionality in the menu page
    const orderButtons = document.querySelectorAll('.order-button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function () {
            const item = this.getAttribute('data-item');
            alert(`You have ordered: ${item}`);
            // Here you might want to add code to handle adding the item to a cart or checkout process
            let cart = [];
let totalPrice = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function placeOrder() {
    alert('Order placed! Thank you.');
    cart = [];
    totalPrice = 0;
    updateCart();
}

        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.dataset.item;
            addToCart(item);
        });
    });

    function addToCart(item) {
        cart.push(item);
        alert(`${item} has been added to your cart!`);
        console.log(cart);
    }
});
