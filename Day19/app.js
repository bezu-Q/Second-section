let items = [];

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");

    li.dataset.id = item.id;

    const name = document.createElement("span");
    name.textContent = item.name;

    if (item.done) {
      li.classList.add("done");
    }

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.dataset.action = "remove";

    li.appendChild(name);
    li.appendChild(button);

    list.appendChild(li);
  });

  const remaining = items.filter(item => !item.done).length;

  count.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} remaining`;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = input.value.trim();

  if (name === "") {
    return;
  }

  const duplicate = items.some(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    alert("This item is already added.");
    return;
  }

  items.push({
    id: Date.now(),
    name: name,
    done: false
  });

  input.value = "";

  render();
});

list.addEventListener("click", function(event) {
  const li = event.target.closest("li");

  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (event.target.dataset.action === "remove") {
    items = items.filter(item => item.id !== id);
    render();
    return;
  }

  const item = items.find(item => item.id === id);

  if (item) {
    item.done = !item.done;
    render();
  }
});

render();