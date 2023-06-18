const container = document.querySelector(".cards-container");
const loadMoreButton = document.querySelector(".load-more-button");
const themeToggle = document.getElementById("themeToggle");

let data = [];

const getNextCards = (count) => {
  const nextCards = data.splice(0, count);
  return nextCards;
};

fetch("data.json")
  .then((response) => response.json())
  .then((fetchedData) => {
    data = fetchedData;
    renderCards(getNextCards(4));
  })
  .catch((error) => {
    console.error(error);
  });

// removing exact time from date
function dateFormatter(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const renderCards = (data) => {
  data.map((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardContent = `
    <div class="author-info">
      <div class="author-image">
        <img
          src=${cardData?.profile_image}
        />
      </div>
      <div class="author-details">
        <p class="author-name">${cardData?.name}</p>
        <p class="date">Posted on: ${dateFormatter(cardData?.date)}</p>
        <p class="likes">Likes: ${cardData?.likes}</p>
      </div>
    </div>
    <div class="image-container">
      <img
        src=${cardData?.image}
      />
    </div>
    <div class="card-content">
      <p class="caption">
        ${cardData?.caption}
      </p>
      <div class="source">
        <img src="./${
          cardData?.source_type === "facebook"
            ? cardData?.source_type + ".png"
            : cardData?.source_type + ".jpg"
        }" alt="source image" />
        <a class="source-link" href=${cardData?.source_link}
          >Visit Source</a
        >
      </div>
    </div>
    `;

    card.innerHTML = cardContent;
    container.appendChild(card);
  });
};

// toggle theme
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});

// load more cards button
loadMoreButton.addEventListener("click", () => {
  const moreCards = getNextCards(4);
  renderCards(moreCards);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
  if (data.length === 0) {
    loadMoreButton.style.display = "none";
  }
});
