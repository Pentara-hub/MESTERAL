window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  if (!grid || typeof productSections === "undefined") return;

  productSections.forEach((section) => {
    const heading = document.createElement("h2");
    heading.className = "product-section-title";
    heading.textContent = section.title;
    grid.appendChild(heading);

    const sectionWrapper = document.createElement("div");
    sectionWrapper.className = "product-section";

    section.products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p><strong>Gauge:</strong> ${product.gauge}</p>
          <p><strong>Needle Type:</strong> ${product.needleType}</p>
          <p><strong>Needle Size:</strong> ${product.needleSize}</p>
          <p><strong>Length:</strong> ${product.length}</p>
          <p><strong>Code:</strong> ${product.code}</p>
        </div>
      `;

      sectionWrapper.appendChild(card);
    });

    grid.appendChild(sectionWrapper);
  });
});
