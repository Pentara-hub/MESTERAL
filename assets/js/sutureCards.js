const sutures = [
  {
    name: "PGA",
    description: `Synthetic absorbable surgical suture <br>   Coated & Braided PGA`,
    pdfLink: "assets/pdfs/PGA.pdf",
    image: "assets/img/Suture/PGA.jpg",
  },
  {
    name: "Lactisorb",
    description: `Synthetic absorbable surgical suture <br> Coated & Braided Polyglactin 910`,
    pdfLink: "assets/pdfs/Lactisorb.pdf",
    image: "assets/img/Suture/Lactisorb.jpg",
  },
  {
    name: "Lactisorb Rapid",
    description: ` Synthetic absorbable surgical suture <br> Coated & Braided Poliglactin 910`,
    pdfLink: "assets/pdfs/LACTISORB-RAPID.pdf",
    image: "assets/img/Suture/Lactisorb_Rapid.jpg",
  },
  {
    name: "PDO",
    description: `Synthetic absorbable surgical suture <br> Monofilament Polydioxanone`,
    pdfLink: "assets/pdfs/PDO.pdf",
    image: "assets/img/Suture/PDO.jpg",
  },
  {
    name: "Monoquick",
    description: `Synthetic absorbable surgical suture <br> Monofilament Poliglecaprone 25`,
    pdfLink: "assets/pdfs/MONOQUICK.pdf",
    image: "assets/img/Suture/MONOQUICK.jpg",
  },
  {
    name: "Polypropylene",
    description: ` Nonabsorbable surgical suture monofilament <br> Polypropylene`,
    pdfLink: "assets/pdfs/POLYPROPYLENE.pdf",
    image: "assets/img/Suture/POLYPROPYLENE.jpg",
  },
  {
    name: "Nylon",
    description: `Non-absorbable surgical suture <br> Monofilament Polyamide`,
    pdfLink: "assets/pdfs/NYLON.pdf",
    image: "assets/img/Suture/NYLON.jpg",
  },
  {
    name: "Silk",
    description: `Natural non-absorbable surgical suture <br> Braided & Coated Silk`,
    pdfLink: "assets/pdfs/SILK.pdf",
    image: "assets/img/Suture/SILK.jpg",
  },
  {
    name: "Polyester-S",
    description: `Non-absorbable surgical suture <br> coated & Braited Polyester`,
    pdfLink: "assets/pdfs/Polyester-S.pdf",
    image: "assets/img/Suture/Polyester-S.jpg",
  },
  {
    name: "Polyester-CV",
    description: `Non-absorbable surgical suture <br> PTFE coated & Braided Polyester`,
    pdfLink: "assets/pdfs/Polyester-CV.pdf",
    image: "assets/img/Suture/Polyester-CV.jpg",
  },
  {
    name: "PTFE",
    description: `Nonabsorbable surgical suture<br> monofilament PTFE`,
    pdfLink: "assets/pdfs/PTFE.pdf",
    image: "assets/img/Suture/PTFE.jpg",
  },
  {
    name: "PVDF",
    description: `Nonabsorbable surgical suture <br> monofilament Polyvinylidene fluoride`,
    pdfLink: "assets/pdfs/PVDF.pdf",
    image: "assets/img/Suture/PVDF.jpg",
  },
  {
    name: "Orthopylene",
    description: ` Nonabsorbable surgical suture braided 
                  <br> ultra-high molecular weight Polyethylene 
                  <br> cobraided with polypropylene /Nylon`,
    pdfLink: "assets/pdfs/ORTHOPYLENE.pdf",
    image: "assets/img/Suture/ORTHOPYLENE.jpg",
  },
  {
    name: "Polyamide",
    description: `Non-absorbable surgical suture <br> Braited Polyamide`,
    pdfLink: "assets/pdfs/POLYAMIDE.pdf",
    image: "assets/img/Suture/POLYAMIDE.jpg",
  },
  {
    name: "Supramid",
    description: `Nonabsorbable surgical suture <br> pseudo-monofilament Polyamide`,
    pdfLink: "assets/pdfs/SUPRAMID.pdf",
    image: "assets/img/Suture/SUPRAMID.jpg",
  },
];

function renderCards(filteredSutures) {
  const grid = document.getElementById("suture-grid");
  grid.innerHTML = "";

  filteredSutures.forEach((suture) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${suture.image}" alt="${suture.name}" class="suture-thumb" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${suture.name}</h5>
          <p class="card-text flex-grow-1">${suture.description}</p>
          <button class="btn btn-primary mt-3" data-pdf="${suture.pdfLink}" data-name="${suture.name}" data-bs-toggle="modal" data-bs-target="#pdfModal">
            View PDF
          </button>
        </div>
      </div>
    `;

    grid.appendChild(col);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  renderCards(sutures); // initial render

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = sutures.filter(
      (suture) =>
        suture.name.toLowerCase().includes(query) ||
        suture.description.toLowerCase().includes(query)
    );
    renderCards(filtered);
  });

  // PDF Modal
  const pdfModal = document.getElementById("pdfModal");
  const pdfFrame = document.getElementById("pdfFrame");
  const modalTitle = document.getElementById("pdfModalTitle");

  pdfModal.addEventListener("show.bs.modal", (e) => {
    const button = e.relatedTarget;
    const pdfUrl = button.getAttribute("data-pdf");
    const name = button.getAttribute("data-name");

    modalTitle.textContent = `${name} - Suture Details`;
    pdfFrame.src = pdfUrl;
  });

  pdfModal.addEventListener("hidden.bs.modal", () => {
    pdfFrame.src = "";
  });
});
