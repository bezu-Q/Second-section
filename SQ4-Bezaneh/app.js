const state = { 
    dishes: [], 
    cart: [], 
    search: "" 
};

const menuEl = document.querySelector("#menu");
const cartEl = document.querySelector("#cart");
const searchEl = document.querySelector("#search");

async function loadMenu() {
    menuEl.textContent = "Loading menu...";
    try {
        const res = await fetch("data/menu.json");
        if (!res.ok) 
            throw new Error("HTTP " + res.status);
        state.dishes = await res.json();
        render();
    } catch (err) {
        menuEl.textContent = "Could not load the menu.";
    }
}

function render() {
    const term = state.search.toLowerCase();
    const shown = state.dishes.filter(d => d.name.toLowerCase().includes(term));
    
    if (shown.length === 0) {
        menuEl.innerHTML = "<p>No dishes found.</p>";
    } else {
        menuEl.innerHTML = shown.map(d => `
            <article class="dish" data-id="${d.id}">
                <img src="${d.image}" alt="${d.name}">
                <h3>${d.name}</h3>
                <p class="price">${d.price} ETB</p>
                <button class="add">Add</button>
            </article>
        `).join("");
    }
    renderCart();
}


function renderCart() {
    if (state.cart.length === 0) {
        cartEl.innerHTML = "<h2>Cart</h2><p>Empty</p>";
        return;
    }

    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    cartEl.innerHTML = `<h2>Cart</h2><ul>` + 
        state.cart.map(i => `<li data-id="${i.id}">${i.name} x${i.qty} - ${i.price * i.qty} ETB <button class="rm"> Delete </button></li>`).join("") +
        `</ul><h3>Total: ${total} ETB</h3>`;
}

function save() { 
    localStorage.setItem("addiseats", JSON.stringify(state.cart)); 
}

function load() {
    const s = localStorage.getItem("addiseats");
    if (s) {
        state.cart = JSON.parse(s);
    }
}

searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
});

menuEl.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) 
        return;
    const id = Number(e.target.closest(".dish").dataset.id);
    const dish = state.dishes.find(d => d.id === id);
    const line = state.cart.find(i => i.id === id);

    if (line){
        line.qty++;
    }
    else {
        state.cart.push({ ...dish, qty: 1 });
    }

    save(); 
    render();
});

cartEl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) 
        return;
    const id = Number(e.target.closest("li").dataset.id);
    const line = state.cart.find(i => i.id === id);

    if (line.qty > 1) {
        line.qty--;
    }
    else 
        state.cart = state.cart.filter(i => i.id !== id);
    save(); 
    render();
});

async function init() { 
    load(); 
    await loadMenu(); 
}

init();