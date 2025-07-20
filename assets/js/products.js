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
        col.className = "col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
          <div class="product-card h-100">
            <img src="${product.image}" alt="${
          product.name
        }" class="product-thumb" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text flex-grow-1">${product.description}</p>
              ${
                product.pdfLink
                  ? `<button class="product-btn mt-3 view-pdf-btn"
                      
                      data-pdf="${product.pdfLink}"
                      data-name="${product.name}">
                      View PDF
                    </button>`
                  : ""
              }
            </div>
          </div>
        `;

        sectionWrapper.appendChild(col);
      });

      grid.appendChild(sectionWrapper);
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("view-pdf-btn")) {
      const pdfUrl = e.target.getAttribute("data-pdf");
      document.getElementById("pdfFrame").src = pdfUrl;
      const modal = new bootstrap.Modal(document.getElementById("pdfModal"));
      modal.show();
    }
  });

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
    sutures: "R1 Sutures",
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

  // Fix lingering overlay/backdrop issues after closing modal
  const pdfModalEl = document.getElementById("pdfModal");

  pdfModalEl.addEventListener("hidden.bs.modal", () => {
    document.getElementById("pdfFrame").src = "";
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  });
});
