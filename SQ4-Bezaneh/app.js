//here we put our state and the constant values
const STORAGE_KEY = "addiseats";
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/; 

const state = {
    dishes: [],
    cart: [],
    search: ""
};

const elements = {
    menu: document.querySelector("#menu"),
    cartItems: document.querySelector("#cart-items"),
    search: document.querySelector("#search"),
    form: document.querySelector("#checkout"),
    error: document.querySelector("#form-error")
};

// This is where we load our data
async function loadMenu() {
    elements.menu.innerHTML = '<p class="empty-state">Loading menu...</p>';
    
    try {
        const res = await fetch("data/menu.json");
        
        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }
        
        state.dishes = await res.json();
        renderMenu();
    } catch (err) {
        console.error("Fetch error:", err);
        elements.menu.innerHTML = '<p class="empty-state error">Could not load the menu. Please try again later.</p>';
    }
}

//this function is the rendering function
function renderMenu() {
    const term = state.search.toLowerCase();
    
    const shown = state.dishes.filter(d => {
        return d.name.toLowerCase().includes(term);
    });
    
    if (shown.length === 0) {
        elements.menu.innerHTML = '<p class="empty-state">No dishes found matching your search.</p>';
        return;
    }

    elements.menu.innerHTML = shown.map(d => {
        return `
        <article class="dish" data-id="${d.id}">
            <img src="${d.image}" alt="${d.name}">
            <h3>${d.name}</h3>
            <p class="price">${d.price} ETB</p>
            <button class="add">Add</button>
        </article>
        `;
    }).join("");
}

function renderCart() {
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = '<h2>Cart</h2><p class="empty-state">Your cart is empty.</p>';
        return;
    }

    const total = cartTotal(); //hoisting
    
    const listHtml = state.cart.map(i => {
        return `
        <li data-id="${i.id}">
            <span>${i.name} (x${i.qty})</span>
            <span>${i.price * i.qty} ETB <button class="rm" aria-label="Remove item">Delete</button></span>
        </li>
        `;
    }).join("");

    //what we see at the side with the cart and the total part
    elements.cartItems.innerHTML = `
        <h2>Cart</h2>
        <ul class="cart-list">${listHtml}</ul>
        <h3>Total: ${total} ETB</h3>
    `;
}

//some other functions are separately put here
function cartTotal() {
    return state.cart.reduce((sum, item) => { //to sum the total price
        return sum + item.price * item.qty;
    }, 0);
}


//saving to local storage
function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    
    if (saved) {
        state.cart = JSON.parse(saved);
    }
}

//the validationa and checkout logic is below
function validateForm({ name, phone }) {
    if (state.cart.length === 0) {
        return "Your cart is empty.";
    }
    
    if (!name.trim()) {
        return "Please enter your name.";
    }
    
    if (!PHONE_REGEX.test(phone)) {
        return "Enter a valid Ethiopian phone (e.g., 09..... or +2519.....).";
    }
    
    return "";
}

function placeOrder(data) {
    const order = {
        ...data,
        items: state.cart,
        total: cartTotal(),
    };
    
    console.log("Order Placed:", order);
    
    state.cart = [];
    saveCart();
    renderCart();
    elements.form.reset();
    
    alert(`Order confirmed! Total: ${order.total} ETB. Delivering to ${order.area}.`);
}

//Event liseners are gathered here together
elements.search.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderMenu(); 
});

elements.menu.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) {
        return;
    }
    
    const id = Number(e.target.closest(".dish").dataset.id);
    const dish = state.dishes.find(d => d.id === id);
    const lineItem = state.cart.find(i => i.id === id);
    
    if (lineItem) {
        lineItem.qty++;
    } else {
        state.cart.push({
            ...dish,
            qty: 1
        });
    }
    
    saveCart();
    renderCart();
});

elements.cartItems.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) {
        return;
    }
    
    const id = Number(e.target.closest("li").dataset.id);
    const lineItem = state.cart.find(i => i.id === id);
    
    if (lineItem.qty > 1) {
        lineItem.qty--;
    } else {
        state.cart = state.cart.filter(i => i.id !== id);
    }
    
    saveCart();
    renderCart();
});

elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.querySelector("#name").value,
        phone: document.querySelector("#phone").value,
        area: document.querySelector("#area").value
    };

    const errorMsg = validateForm(formData);
    elements.error.textContent = errorMsg;
    
    if (!errorMsg) {
        placeOrder(formData);
    }
});

//intializing the whole system here
async function init() {
    loadCart();
    renderCart();
    await loadMenu();
}

init();