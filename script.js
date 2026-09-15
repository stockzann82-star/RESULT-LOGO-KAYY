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
const count = document.getElementById("count");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalNumber = document.getElementById("modal-number");
const download = document.getElementById("download");

function render() {
  count.textContent = `${results.length} RESULTS`;
  grid.innerHTML = "";

  results.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="thumb">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="card-info">
        <small>RESULT ${String(index + 1).padStart(2, "0")}</small>
        <h3>${item.title}</h3>
      </div>
    `;

    card.addEventListener("click", () => openModal(item, index));
    grid.appendChild(card);
  });
}

function openModal(item, index) {
  modalImg.src = item.image;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalNumber.textContent = `RESULT ${String(index + 1).padStart(2, "0")}`;
  download.href = item.image;
  download.download = item.title.replace(/\s+/g, "-").toLowerCase() + ".jpg";
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
  modalImg.src = "";
}

document.getElementById("close").addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

render();

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 900);
});});

window.addEventListener("load", () => {
  render();

  // Jangan sampai loading muter selamanya
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 300);
  }
});
