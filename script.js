const results = [
  // Tambahkan result baru di sini.
  // Contoh:
  // { title: "Chisa Wuwek", image: "images/chisa-wuwek.png" },
  { title: "Your First Result", image: "images/example.png" }
];

const grid = document.getElementById("gallery-grid");
const count = document.getElementById("count");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalNumber = document.getElementById("modal-number");
const download = document.getElementById("download");

function render() {
  count.textContent = `${results.length} RESULT${results.length === 1 ? "" : "S"}`;
  grid.innerHTML = "";

  if (!results.length) {
    grid.innerHTML = `<div class="empty"><b>Belum ada result.</b><br>Tambahkan gambar ke folder <b>images</b> lalu masukkan datanya di <b>script.js</b>.</div>`;
    return;
  }

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
  download.download = item.title.replace(/\s+/g, "-").toLowerCase() + ".png";
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

window.addEventListener("load", () => {
  render();
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 900);
});
