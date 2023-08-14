var MenuItems = document.getElementById("Menuitems");
MenuItems.style.maxHeight = "0px";
var cart = [];
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth"
        });
    }
}
function addToCart(button) {
    const productDiv = button.parentElement.parentElement;
    const productName = productDiv.querySelector('h4').innerText;
    const productPrice = parseFloat(productDiv.querySelector('p').innerText.replace('$', ''));
    const productImage = productDiv.querySelector('img').src;
    var productButtons = button.parentElement.querySelector('.product-buttons');

    console.log('ProductName:', productName);
    console.log('ProductPrice:', productPrice);
    console.log('ProductImage:', productImage);

    var product = {
        name: productName,
        price: productPrice
    };

    // Check if the product is already in the cart
    var productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex === -1) {
        cart.push(product);
        updateCartIcon();
        updateCartContent();
        button.textContent = 'Added to Cart';
        button.style.backgroundColor = '#4CAF50';
        button.disabled = true;
        var productButtons = productDiv.querySelector('.product-buttons');
        productButtons.innerHTML = `
            <button class="btn delete-from-cart-btn" onclick="deleteFromCart('${productName}')">Delete</button>
            <button class="btn buy-now-btn" onclick="buyNow()">Buy Now &#8594</button>
        `;

        alert(productName + " added to cart!");
    } else {
        // If the product is already in the cart, show an alert
        alert(productName + " is already in the cart!");
    }
}
function deleteFromCart(productName) {
    // Remove the item from the cart
    cart = cart.filter(item => item.name !== productName);
    // Update cart icon and content
    updateCartIcon();
    updateCartContent();

    // Find the corresponding "Add to Cart" button and reset it
    var productDiv = document.querySelector(`.col-4 h4:contains('${productName}')`).closest('.col-4');
    var addToCartButton = productDiv.querySelector('.add-to-cart-btn');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.style.backgroundColor = '#ff523b';
    addToCartButton.disabled = false;

    alert(productName + " removed from cart!");
}
function updateCartIcon() {
    var cartIcon = document.getElementById("cart-icon");
    cartIcon.textContent = cart.length;
}
function updateCartContent() {
    var cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = ""; // Clear previous cart content

    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        for (var i = 0; i < cart.length; i++) {
            var cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = "<p>" + cart[i].name + " - $" + cart[i].price + "</p>";
            cartContent.appendChild(cartItem);
        }
    }
}
function openCart() {
    window.location.href = "cart.html";
    var cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = ""; // Clear previous cart content

    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        for (var i = 0; i < cart.length; i++) {
            var cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = "<p>" + cart[i].name + " - $" + cart[i].price + "</p>";
            cartContent.appendChild(cartItem);
        }
    }

    var cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "block";
}

function closeCart() {
    var cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "none";
}
function buyNow() {
    // Implement your payment gateway integration here
    alert("Redirecting to payment gateway...");
}
document.addEventListener("DOMContentLoaded", function() {
    var homeLink = document.querySelector('a[href="#home"]');
    var productsLink = document.querySelector('a[href="#latest-products"]');
    var contactLink = document.querySelector('a[href="#contact"]');
    var cartItems = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            var productDiv = button.closest(".col-4"); // Update this selector
            var productName = productDiv.querySelector("h4").textContent;
            var productPrice = parseFloat(productDiv.querySelector("p").textContent.replace("$", ""));
            
            addToCart(productName, productPrice); // Call addToCart function with product details
        });
    });
    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToSection("home");
    });

    productsLink.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToSection("latest-products");
    });

    contactLink.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToSection("contact");
    });
    function updateCart() {
        cartItems.innerHTML = "";
        cartTotal.textContent = calculateTotal().toFixed(2);

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            for (var i = 0; i < cart.length; i++) {
                var cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <p>${cart[i].name} - $${cart[i].price}</p>
                    <button class="btn delete-from-cart-btn" onclick="deleteFromCart('${cart[i].name}')">Delete</button>
                `;
                cartItems.appendChild(cartItem);
            }
        }
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    updateCart();
});