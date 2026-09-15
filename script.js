const results = [
  { title: "Result 01", image: "IMG-20260826-WA0066.jpg" },
  { title: "Result 02", image: "IMG-20260826-WA0067.jpg" },
  { title: "Result 03", image: "IMG-20260826-WA0068.jpg" },
  { title: "Result 04", image: "IMG-20260826-WA0070.jpg" },
  { title: "Result 05", image: "IMG-20260826-WA0071.jpg" },
  { title: "Result 06", image: "IMG-20260826-WA0072.jpg" },
  { title: "Result 07", image: "IMG-20260826-WA0073.jpg" },
  { title: "Result 08", image: "IMG-20260826-WA0074.jpg" },
  { title: "Result 09", image: "IMG-20260826-WA0077.jpg" },
  { title: "Result 10", image: "IMG-20260826-WA0078.jpg" }
];

const grid = document.getElementById("gallery-grid");
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const downloadBtn = document.getElementById("download-btn");
const closeBtn = document.getElementById("modal-close");
const loader = document.getElementById("loader");

function render() {
  if (!grid) return;

  grid.innerHTML = "";

  results.forEach((result, index) => {
    const card = document.createElement("article");
    card.className = "result-card";

    card.innerHTML = `
      <div class="result-image-wrap">
        <img
          src="${result.image}"
          alt="${result.title}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
        >
        <div class="image-error-text">Image tidak ditemukan</div>
      </div>

      <div class="result-info">
        <h3>${result.title}</h3>
        <button class="view-btn" type="button">View</button>
      </div>
    `;

    const viewBtn = card.querySelector(".view-btn");

    viewBtn.addEventListener("click", () => {
      openModal(result);
    });

    grid.appendChild(card);
  });
}

function openModal(result) {
  if (!modal || !modalImage) return;

  modalImage.src = result.image;

  if (modalTitle) {
    modalTitle.textContent = result.title;
  }

  if (downloadBtn) {
    downloadBtn.href = result.image;
    downloadBtn.download = result.title.replace(/\s+/g, "-") + ".jpg";
  }

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.classList.remove("modal-open");

  if (modalImage) {
    modalImage.src = "";
  }
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

window.addEventListener("load", () => {
  render();

  // Jangan sampai loading muter selamanya
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 300);
  }
});
