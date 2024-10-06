const API_KEY = "d3d13b72889c422ebb12579b692c853a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
} 

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
   bindData(data.articles);
}

function bindData(articles){
    const cards_container = document.getElementById("cards-container");
    const card_template = document.getElementById("template-news-card");
   
    cards_container.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = card_template.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cards_container.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSrc = cardClone.querySelector("#news-source");
    const newsDisc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDisc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSrc.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>
    window.open(article.url,"_blank"));

}
let currentSelNav = null;

function onNavItemClick(id){
fetchNews(id);

const navItem = document.getElementById(id);
currentSelNav?.classList.remove("active");
currentSelNav = navItem;
currentSelNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
const query = searchText.value;
if(!query)return;
fetchNews(query);
currentSelNav?.classList.remove("active");
currentSelNav= null;
});
