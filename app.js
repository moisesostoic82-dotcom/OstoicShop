fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('products');

    data.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="${p.image}" />
          <h3>${p.name}</h3>
          <p>${p.price}</p>
          <a href="${p.url}" target="_blank">Comprar</a>
        </div>
      `;
    });
  });