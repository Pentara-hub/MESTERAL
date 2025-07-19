window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("searchInput");

  function renderProducts(sections) {
    grid.innerHTML = "";

    sections.forEach((section) => {
      const sectionTitle = document.createElement("h2");
      sectionTitle.className = "product-section-title";
      sectionTitle.textContent = section.title;
      grid.appendChild(sectionTitle);

      const sectionWrapper = document.createElement("div");
      sectionWrapper.className = "row gy-4";

      section.products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        col.innerHTML = `
          <div class="card h-100">
            <img src="${product.image}" alt="${product.name}" class="product-thumb" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text flex-grow-1">${product.description}</p>
            </div>
          </div>
        `;

        sectionWrapper.appendChild(col);
      });

      grid.appendChild(sectionWrapper);
    });
  }

  function filterProducts(query) {
    const filtered = productSections
      .map((section) => ({
        ...section,
        products: section.products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.products.length > 0);

    renderProducts(filtered);
  }

  renderProducts(productSections);

  const filterButtons = document.querySelectorAll(".filter-btn");

  const filterMap = {
    all: "All",
    sutures: "Sutures",
    orthopedic: "Orthopedic Implants",
    syringes: "Safety Syringes",
    telemedicine: "Telemedicine Devices",
    dental: "Dental Anesthetics",
    supplies: "Medical Supplies",
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      if (category === "all") {
        renderProducts(productSections);
      } else {
        const selectedTitle = filterMap[category];
        const filtered = productSections.filter(
          (section) => section.title === selectedTitle
        );
        renderProducts(filtered);
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      filterProducts(query);
    });
  }
});
