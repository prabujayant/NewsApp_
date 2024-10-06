

const apiKey = "pub_49382065c0e1d9ba756262cd97f2478b7830b";
const baseUrl = "https://newsdata.io/api/1/news?apiKey=" + apiKey;

window.addEventListener("load", () => fetchNews("India"));

function loadWeb() {
  window.location.reload();
}

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
  const cardContainer = document.getElementById("cards-container");
  const cardTemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";
  if (!articles || !Array.isArray(articles)) return;
  
  articles.forEach((article) => {
    if (!article.image_url) return;
    const cloneCard = cardTemplate.content.cloneNode(true);
    fillData(cloneCard, article);
    cardContainer.appendChild(cloneCard);
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
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source_id} · ${date}`;
  cloneCard.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}

let selectedItem = null;
function clickItem(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  selectedItem?.classList.remove("active");
  selectedItem = navItem;
  selectedItem.classList.add("active");
}

const searchTxt = document.getElementById("search-txt");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const query = searchTxt.value;
  if (!query) return;
  fetchNews(query);
  if (selectedItem) {
    selectedItem.classList.remove("active");
    selectedItem = null;
  }
});

const goTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    goTop.classList.add("active");
  } else {
    goTop.classList.remove("active");
  }
});
