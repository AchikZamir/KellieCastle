const stops = [
  {
    id: "hall", floor: "Ground floor", floorBm: "Aras bawah", title: "The Main Hall", titleBm: "Dewan Utama",
    subtitle: "The grand welcome", subtitleBm: "Sambutan utama",
    text: "This impressive hall was designed to welcome planters and dignitaries. Its open arches brought light and cool air into the unfinished mansion.",
    textBm: "Dewan yang mengagumkan ini direka untuk menyambut para peladang dan tetamu kehormat. Gerbang terbukanya membawa cahaya dan udara sejuk ke dalam rumah agam yang belum siap.",
    factTitle: "Built for grand occasions",
    factTitleBm: "Dibina untuk majlis besar",
    fact: "William Kellie Smith imagined the castle as a social centre for Perak's colonial planting community, with generous spaces for entertaining.",
    factBm: "William Kellie Smith membayangkan istana ini sebagai pusat sosial komuniti perladangan kolonial Perak, dengan ruang luas untuk hiburan.",
    pitch: -8, yaw: -30
  },
  {
    id: "lift", floor: "Tower", floorBm: "Menara", title: "The Lift Shaft", titleBm: "Ruang Lif",
    subtitle: "A first for Malaya", subtitleBm: "Yang pertama di Tanah Melayu",
    text: "The six-storey tower was planned to contain an elevatoran extraordinary luxury for its time. The machinery never arrived before construction stopped.",
    textBm: "Menara enam tingkat ini dirancang untuk mempunyai lifkemewahan luar biasa pada zamannya. Mesin lif tidak sempat tiba sebelum pembinaan terhenti.",
    factTitle: "An unfinished innovation",
    factTitleBm: "Inovasi yang tidak sempat disiapkan",
    fact: "The elevator was intended to connect the lower floors to the rooftop entertainment area. Today, the empty shaft remains one of the castle's most recognisable features.",
    factBm: "Lif itu dirancang untuk menghubungkan tingkat bawah ke ruang hiburan atas bumbung. Hari ini, ruang lif kosong kekal sebagai salah satu ciri istana yang paling dikenali.",
    pitch: 2, yaw: 36
  },
  {
    id: "cellar", floor: "Basement", floorBm: "Bawah tanah", title: "The Wine Cellar", titleBm: "Bilik Simpanan Wain",
    subtitle: "Below the castle", subtitleBm: "Di bawah istana",
    text: "A narrow spiral stairway leads towards a cellar said to have been designed for thousands of bottles, with sealed passages extending beyond it.",
    textBm: "Tangga berpilin yang sempit menuju ke bilik bawah tanah yang dikatakan direka untuk menyimpan ribuan botol, dengan laluan tertutup di luarnya.",
    factTitle: "The passage below",
    factTitleBm: "Laluan di bawah",
    fact: "Stories tell of underground routes connecting parts of the estate. Some were later sealed for visitor safety, adding to the castle's enduring mystery.",
    factBm: "Cerita menyebut laluan bawah tanah yang menghubungkan beberapa bahagian ladang. Sebahagiannya kemudian ditutup untuk keselamatan pengunjung, menambah misteri istana ini.",
    pitch: -17, yaw: 88
  },
  {
    id: "drink", floor: "Ground floor", floorBm: "Aras bawah", title: "The Bar Lounge", titleBm: "Bilik Minum",
    subtitle: "Stories after dusk", subtitleBm: "Cerita selepas senja",
    text: "This intimate room was planned as a place for William and fellow estate owners to meet, talk business, and unwind after long tropical days.",
    textBm: "Bilik yang selesa ini dirancang sebagai tempat William dan pemilik ladang lain bertemu, berbincang urusan, dan berehat selepas hari yang panjang.",
    factTitle: "A room for conversation",
    factTitleBm: "Bilik untuk berbual",
    fact: "The surviving decorative floor finish hints at the refined interior William intended for his family and guests.",
    factBm: "Kemasan lantai hiasan yang masih ada memberi gambaran dalaman halus yang dirancang William untuk keluarga dan tetamunya.",
    pitch: -5, yaw: 142
  },
  {
    id: "room", floor: "Level 1", floorBm: "Aras 1", title: "The Family Rooms", titleBm: "Bilik Keluarga",
    subtitle: "Private lives", subtitleBm: "Kehidupan peribadi",
    text: "The family bedrooms sat side by side. Generous windows and balconies were designed for natural ventilation in Perak's warm climate.",
    textBm: "Bilik tidur keluarga terletak bersebelahan. Tingkap besar dan balkoni direka untuk pengudaraan semula jadi dalam cuaca panas Perak.",
    factTitle: "A staircase in every room",
    factTitleBm: "Tangga di setiap bilik",
    fact: "Several rooms include narrow private stairways leading down, often described as emergency escape routes for the family.",
    factBm: "Beberapa bilik mempunyai tangga peribadi yang sempit menuju ke bawah, sering digambarkan sebagai laluan kecemasan untuk keluarga.",
    pitch: 7, yaw: -120
  },
  {
    id: "rooftop", floor: "Rooftop", floorBm: "Atas bumbung", title: "The Rooftop Court", titleBm: "Gelanggang Atas Bumbung",
    subtitle: "A view over Perak", subtitleBm: "Pemandangan Perak",
    text: "At the top, William planned a tennis court and a courtyard for partiesan ambitious gathering place above the Kinta Valley landscape.",
    textBm: "Di bahagian atas, William merancang gelanggang tenis dan halaman untuk majlistempat pertemuan yang bercita-cita tinggi menghadap Lembah Kinta.",
    factTitle: "The castle's highest dream",
    factTitleBm: "Impian tertinggi istana",
    fact: "The rooftop was meant to complete the castle as both a family home and a destination for lavish social occasions.",
    factBm: "Atas bumbung ini bertujuan melengkapkan istana sebagai rumah keluarga dan destinasi untuk majlis sosial yang mewah.",
    pitch: 12, yaw: -62
  }
];

let language = "en";
let activeIndex = 0;
let streetViewFrame;
let audioPlaying = false;
const visited = new Set();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const welcome = $("#welcome");
const tour = $("#tour");
const stopList = $("#stopList");
const storyCard = $("#storyCard");
const mapModal = $("#mapModal");
const factModal = $("#factModal");

function localized(item, key) {
  return language === "bm" ? item[`${key}Bm`] : item[key];
}

function renderStops() {
  stopList.innerHTML = stops.map((stop, index) => `
    <button class="stop ${index === activeIndex ? "active" : ""} ${visited.has(stop.id) ? "visited" : ""}" data-index="${index}">
      <span class="stop-number">${String(index + 1).padStart(2, "0")}</span>
      <span><strong>${localized(stop, "title")}</strong><small>${localized(stop, "subtitle")}</small></span>
      <span class="stop-arrow">&rarr;</span>
    </button>
  `).join("");
  $$(".stop").forEach(button => button.addEventListener("click", () => selectStop(Number(button.dataset.index))));
}

function updateStory() {
  const stop = stops[activeIndex];
  visited.add(stop.id);
  $("#storyKicker").textContent = `${language === "bm" ? "Hentian" : "Stop"} ${String(activeIndex + 1).padStart(2, "0")} - ${localized(stop, "subtitle")}`;
  $("#storyTitle").textContent = localized(stop, "title");
  $("#storyText").textContent = localized(stop, "text");
  $("#floorPill").textContent = localized(stop, "floor");
  $("#progressText").textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(stops.length).padStart(2, "0")}`;
  $("#progressBar").style.width = `${((activeIndex + 1) / stops.length) * 100}%`;
  storyCard.classList.remove("hidden");
  $$(".map-marker").forEach(marker => marker.classList.toggle("active", marker.dataset.stop === stop.id));
  if (streetViewFrame) streetViewFrame.src = streetViewUrl(stop);
  renderStops();
}

function selectStop(index) {
  activeIndex = index;
  updateStory();
  document.querySelector(".sidebar").classList.remove("mobile-open");
  $$(".mobile-tabs button").forEach((button, i) => button.classList.toggle("active", i === 0));
  history.replaceState({}, "", `${location.pathname}?stop=${stops[index].id}`);
}

function streetViewUrl(stop) {
  const heading = (stop.yaw + 360) % 360;
  const pitch = Math.max(-30, Math.min(30, stop.pitch));
  return `https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2smy!4v1425371850608!6m8!1m7!1sTpcbQa4mrz-Xs52YXwgqEg!2m2!1d4.475669!2d101.087176!3f${heading}!4f${pitch}!5f0.7820865974627469`;
}

function initViewer() {
  const panorama = $("#panorama");
  panorama.innerHTML = `<iframe class="streetview-frame" title="Kellie's Castle interactive 360 view" src="${streetViewUrl(stops[activeIndex])}" loading="eager" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  streetViewFrame = panorama.querySelector("iframe");
  $("#panorama").addEventListener("pointerdown", () => $("#dragGuide").classList.add("hide"), { once: true });
  setTimeout(() => $("#dragGuide").classList.add("hide"), 3200);
}

function enterTour() {
  welcome.style.display = "none";
  tour.classList.add("active");
  tour.setAttribute("aria-hidden", "false");
  if (!streetViewFrame) initViewer();
  updateStory();
}

function toggleLanguage() {
  language = language === "en" ? "bm" : "en";
  $$("[data-language]").forEach(button => button.childNodes[0].nodeValue = language === "en" ? "EN " : "BM ");
  $("#factBtn").childNodes[0].nodeValue = language === "en" ? "Reveal a hidden detail " : "Temui rahsia tersembunyi ";
  updateStory();
  showToast(language === "en" ? "Language changed to English" : "Bahasa ditukar ke Bahasa Melayu");
}

function showFact() {
  const stop = stops[activeIndex];
  $("#factTitle").textContent = localized(stop, "factTitle");
  $("#factText").textContent = localized(stop, "fact");
  factModal.showModal();
}

function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

function toggleAudio() {
  if (!("speechSynthesis" in window)) {
    showToast("Audio guide is not supported on this device");
    return;
  }
  const button = $("#audioBtn");
  if (audioPlaying) {
    speechSynthesis.cancel();
    audioPlaying = false;
    button.classList.remove("playing");
    return;
  }
  const stop = stops[activeIndex];
  const utterance = new SpeechSynthesisUtterance(`${localized(stop, "title")}. ${localized(stop, "text")}`);
  utterance.lang = language === "bm" ? "ms-MY" : "en-GB";
  utterance.rate = .9;
  utterance.onend = () => { audioPlaying = false; button.classList.remove("playing"); };
  speechSynthesis.speak(utterance);
  audioPlaying = true;
  button.classList.add("playing");
}

$("#startTour").addEventListener("click", enterTour);
$("#homeLink").addEventListener("click", event => {
  event.preventDefault();
  tour.classList.remove("active");
  tour.setAttribute("aria-hidden", "true");
  welcome.style.display = "flex";
});
$$("[data-language]").forEach(button => button.addEventListener("click", toggleLanguage));
$("#cardClose").addEventListener("click", () => storyCard.classList.add("hidden"));
$("#factBtn").addEventListener("click", showFact);
$("#factClose").addEventListener("click", () => factModal.close());
$("#factDone").addEventListener("click", () => factModal.close());
$("#mapBtn").addEventListener("click", () => mapModal.showModal());
$("#mapClose").addEventListener("click", () => mapModal.close());
$("#audioBtn").addEventListener("click", toggleAudio);
$("#zoomIn").addEventListener("click", () => showToast("Use the controls inside Street View to zoom"));
$("#zoomOut").addEventListener("click", () => showToast("Use the controls inside Street View to zoom"));
$("#resetView").addEventListener("click", () => {
  if (streetViewFrame) streetViewFrame.src = streetViewUrl(stops[activeIndex]);
});

$$(".map-marker").forEach(marker => marker.addEventListener("click", () => {
  const index = stops.findIndex(stop => stop.id === marker.dataset.stop);
  if (index >= 0) {
    mapModal.close();
    selectStop(index);
  }
}));

$$(".floor-tabs button").forEach(button => button.addEventListener("click", () => {
  $$(".floor-tabs button").forEach(tab => tab.classList.remove("active"));
  button.classList.add("active");
  const labels = {
    ground: ["Ground floor", "Aras bawah"],
    first: ["Level 1  Family rooms", "Aras 1  Bilik keluarga"],
    roof: ["Rooftop  Court & tower", "Atas bumbung  Gelanggang & menara"]
  };
  $("#mapFloorLabel").textContent = labels[button.dataset.floor][language === "en" ? 0 : 1];
  $("#floorMap").style.opacity = ".45";
  setTimeout(() => $("#floorMap").style.opacity = "1", 120);
}));

$$("[data-mobile-tab]").forEach(button => button.addEventListener("click", () => {
  const tab = button.dataset.mobileTab;
  $$(".mobile-tabs button").forEach(item => item.classList.toggle("active", item === button));
  if (tab === "journey") document.querySelector(".sidebar").classList.add("mobile-open");
  else document.querySelector(".sidebar").classList.remove("mobile-open");
  if (tab === "map") mapModal.showModal();
}));

[mapModal, factModal].forEach(modal => modal.addEventListener("click", event => {
  if (event.target === modal) modal.close();
}));

renderStops();
const requestedStop = new URLSearchParams(location.search).get("stop");
const requestedIndex = stops.findIndex(stop => stop.id === requestedStop);
if (requestedIndex >= 0) {
  activeIndex = requestedIndex;
  enterTour();
}
