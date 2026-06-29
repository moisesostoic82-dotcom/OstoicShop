let products = [];
let filtered = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;

    renderCategories();
    goHome();
  });

/* 🏠 HOME - MAIS VENDIDOS */
function goHome() {
  filtered = [...products].sort((a, b) => {
    return (b.sales + b.views) - (a.sales + a.views);
  });

  document.getElementById("title").innerText = "🔥 Mais Vendidos";

  renderAll();
}

/* 🔘 CATEGORIAS */
function renderCategories() {
  const cats = [...new Set(products.map(p => p.category))];
  const div = document.getElementById("categories");

  div.innerHTML = "";

  cats.forEach(cat => {
    div.innerHTML += `
      <button onclick="filterCategory('${cat}')">${cat}</button>
    `;
  });
}

/* 📂 FILTRO */
function filterCategory(cat) {
  filtered = products.filter(p => p.category === cat);

  document.getElementById("title").innerText = "📦 " + cat;

  renderAll();
}

/* 🎯 RENDER GERAL */
function renderAll() {
  renderCarousel();
  renderGrid();
}

/* 🎠 CARROSSEL ALEATÓRIO */
function renderCarousel() {
  const div = document.getElementById("carousel");
  div.innerHTML = "";

  let shuffled = [...filtered].sort(() => 0.5 - Math.random());

  shuffled.forEach(p => {
    div.innerHTML += `
      <img src="${p.image}" onclick="openLink('${p.url}')">
    `;
  });
}

/* 🛍️ GRID */
function renderGrid() {
  const div = document.getElementById("grid");
  div.innerHTML = "";

  filtered.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <img src="${p.image}" onclick="openLink('${p.url}')">
        <h4>${p.name}</h4>
      </div>
    `;
  });
}

/* 🔗 LINK */
function openLink(url) {
  window.open(url, "_blank");
}