"use strict";

const profil = {
  nama: "Fara Alizah",
  kelas: "XII RPL",
  sekolah: "SMK Negeri 9 Medan",
  anggota: false,
  organisasi: "",
  bio: "RPL student at SMK Negeri 9 Medan who believes every effort counts. I turn ideas into working code, learn from every bug, and keep building, one project at a time."
};

const keahlian = ["HTML", "CSS", "JavaScript Dasar", "PHP & MySql", "Desain Dasar"];

const proyek = [
  { judul: "Portofolio Pribadi", deskripsi: "Website portofolio responsif yang datanya dirender dari JavaScript: sapaan dinamis, mode gelap, menu seluler, dan validasi formulir.", teknologi: "HTML, CSS, JavaScript" },
  { judul: "Dokumen Desain Website Trans Family Bakery", deskripsi: "Dokumen desain 7 halaman untuk redesign website toko roti, berisi palet warna biru-merah-kuning dan arahan animasi untuk programmer.", teknologi: "Desain UI" },
  { judul: "Bukita", deskripsi: "Website pembelian buku responsif menggunakan struktur MVC, berisi halaman admin dan user yang bisa mencatat riwayat peminjaman buku, membuat denda jika buku terlambat di pulangkan, berisi nama nama buku dan stok buku.", teknologi: "MVC(PHP & Database" }
];

const contohJam = [6, 13, 19, 23]; // contoh jam untuk tombol sapaan
let indeksJam = 0;

// ====== 2. FUNGSI ======
function buatSapaan(jam) {
  if (jam >= 4 && jam < 11) return "Selamat pagi";
  if (jam >= 11 && jam < 15) return "Selamat siang";
  if (jam >= 15 && jam < 18) return "Selamat sore";
  return "Selamat malam";
}

function formatJam(jam) {
  return String(jam).padStart(2, "0") + ".00";
}

function tampilkanSapaan(jam) {
  document.getElementById("sapaan").textContent = buatSapaan(jam) + ", saya";
  document.getElementById("infoJam").textContent = "Contoh jam: " + formatJam(jam);
}

function tampilkanProfil() {
  document.getElementById("nama").textContent = profil.nama;
  let ket = profil.kelas + " · " + profil.sekolah;
  ket += profil.anggota ? " · Anggota " + profil.organisasi : " · Belum tergabung dalam organisasi";
  document.getElementById("keanggotaan").textContent = ket;
  document.getElementById("bio").textContent = profil.bio;
  document.getElementById("logo").textContent = profil.nama.split(" ")[0];
  document.getElementById("footerTeks").textContent =
    "© " + new Date().getFullYear() + " " + profil.nama;
  document.title = "Portofolio " + profil.nama;
}

function tampilkanKeahlian() {
  const ul = document.getElementById("daftarKeahlian");
  ul.innerHTML = "";
  keahlian.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function tampilkanProyek() {
  const wadah = document.getElementById("daftarProyek");
  wadah.innerHTML = "";
  proyek.forEach(function (p) {
    const kartu = document.createElement("article");
    kartu.className = "card";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = p.teknologi;
    const h3 = document.createElement("h3");
    h3.textContent = p.judul;
    const desk = document.createElement("p");
    desk.textContent = p.deskripsi;
    kartu.append(tag, h3, desk);
    wadah.appendChild(kartu);
  });
}

// ====== 3. TOMBOL SAPAAN ======
document.getElementById("sapaBtn").addEventListener("click", function () {
  indeksJam = (indeksJam + 1) % contohJam.length;
  tampilkanSapaan(contohJam[indeksJam]);
});

// ====== 4. MENU SELULER ======
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", function () {
  const terbuka = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(terbuka));
});
nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// ====== 5. MODE GELAP ======
const themeBtn = document.getElementById("themeBtn");
function setTema(gelap) {
  document.body.classList.toggle("dark", gelap);
  themeBtn.textContent = gelap ? "☀️" : "🌙";
  try { localStorage.setItem("tema", gelap ? "gelap" : "terang"); } catch (e) {}
}
themeBtn.addEventListener("click", function () {
  setTema(!document.body.classList.contains("dark"));
});
let temaTersimpan = null;
try { temaTersimpan = localStorage.getItem("tema"); } catch (e) {}
setTema(temaTersimpan === "gelap");

// ====== 6. FORMULIR ======
const form = document.getElementById("formKontak");
const pesanForm = document.getElementById("pesanForm");
const inNama = document.getElementById("inNama");
const inEmail = document.getElementById("inEmail");
const inPesan = document.getElementById("inPesan");

function emailValid(teks) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(teks);
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // cegah reload halaman
  [inNama, inEmail, inPesan].forEach(function (el) { el.classList.remove("invalid"); });
  pesanForm.className = "form-msg";

  const nama = inNama.value.trim();
  const email = inEmail.value.trim();
  const pesan = inPesan.value.trim();
  let error = "";

  if (nama === "") { error = "Nama tidak boleh kosong."; inNama.classList.add("invalid"); }
  else if (email === "") { error = "Email tidak boleh kosong."; inEmail.classList.add("invalid"); }
  else if (!emailValid(email)) { error = "Format email belum benar."; inEmail.classList.add("invalid"); }
  else if (pesan === "") { error = "Pesan tidak boleh kosong."; inPesan.classList.add("invalid"); }

  if (error) {
    pesanForm.textContent = error;
    pesanForm.classList.add("error");
    return;
  }
  pesanForm.textContent = "Terima kasih, " + nama + ". Pesanmu valid (demo, belum dikirim ke server).";
  pesanForm.classList.add("ok");
  form.reset();
});

// ====== 7. JALANKAN SAAT HALAMAN DIMUAT ======
tampilkanProfil();
tampilkanKeahlian();
tampilkanProyek();
tampilkanSapaan(new Date().getHours());
