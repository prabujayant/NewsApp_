// API Configuration
const apiKey = "pub_49382065c0e1d9ba756262cd97f2478b7830b";
const baseUrl = `https://newsdata.io/api/1/news?apiKey=${apiKey}`;

// Default query
const defaultQuery = "Bangalore";

// DOM Elements
const cardContainer = document.getElementById("cards-container");
const cardTemplate = document.getElementById("template-news-card");
const searchTxt = document.getElementById("search-txt");
const searchBtn = document.getElementById("search-btn");
const modeSwitch = document.getElementById('mode-switch');
const goTop = document.querySelector(".back-top");
let selectedItem = null;

// Event Listeners
window.addEventListener("load", () => fetchNews(defaultQuery));
searchBtn.addEventListener("click", handleSearch);
modeSwitch.addEventListener("click", toggleDarkMode);
window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.addEventListener("click", handleNavItemClick));
});

// Functions
async function fetchNews(query) {
  try {
    const response = await fetch(`${baseUrl}&q=${query}`);
    const data = await response.json();
    bindData(data.results);
  } catch (error) {
    console.error("Error fetching the news:", error);
  }
}

function bindData(articles) {
  cardContainer.innerHTML = "";
  if (!articles || !Array.isArray(articles)) return;

  // Create a grid container
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");
  cardContainer.appendChild(gridContainer);

  articles.forEach((article) => {
    if (!article.image_url) return;
    const cloneCard = cardTemplate.content.cloneNode(true);
    fillData(cloneCard, article);
    gridContainer.appendChild(cloneCard);
  });
}

function fillData(cloneCard, article) {
  const newsImage = cloneCard.querySelector(".news-img");
  const newsTitle = cloneCard.querySelector(".news-title");
  const newsSource = cloneCard.querySelector(".news-source");
  const newsDesc = cloneCard.querySelector(".news-disc");

  newsImage.src = article.image_url;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.pubDate).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerHTML = `${article.source_id} · ${date}`;
  cloneCard.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}

function handleNavItemClick(event) {
  const id = event.target.id;
  fetchNews(id);
  if (selectedItem) {
    selectedItem.classList.remove("active");
  }
  selectedItem = event.target;
  selectedItem.classList.add("active");
}

function handleSearch() {
  const query = searchTxt.value.trim();
  if (!query) return;
  fetchNews(query);
  if (selectedItem) {
    selectedItem.classList.remove("active");
    selectedItem = null;
  }
  searchTxt.value = "";
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  modeSwitch.classList.toggle('active');
}

function handleScroll() {
  if (window.pageYOffset > 100) {
    goTop.classList.add("active");
  } else {
    goTop.classList.remove("active");
  }
}

function loadWeb() {
  window.location.reload();
}

goTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
