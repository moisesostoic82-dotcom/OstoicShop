let products = [];
let filtered = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data || [];

    renderCategories();
    goHome();
  });

/* 🏠 HOME */
function goHome() {
  filtered = [...products].sort((a, b) => {
    return (b.sales + b.views) - (a.sales + a.views);
  });

  document.getElementById("title").innerText = "🔥 Mais Vendidos";

  renderAll();
}

/* 🔘 CATEGORIAS */
function renderCategories() {
  const div = document.getElementById("categories");

  div.innerHTML = "";

  if (products.length === 0) {
    div.innerHTML = `<button disabled>Sem categorias</button>`;
    return;
  }

  const cats = [...new Set(products.map(p => p.category))];

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

/* 🎠 CARROSSEL */
function renderCarousel() {
  const div = document.getElementById("carousel");
  div.innerHTML = "";

  if (filtered.length === 0) return;

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

  if (products.length === 0) {
    div.innerHTML = `
      <div style="padding:20px; text-align:center; opacity:0.7;">
        <h2>0 produtos</h2>
        <p>Adicione produtos no sistema</p>
      </div>
    `;
    return;
  }

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
