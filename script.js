const container = document.querySelector(".cards-container");
// Fetch the data from data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    renderCards(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function renderCards(data) {
  data.map((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card-holder");
    const cardContent = `
    <div class="author-info">
      <div class="author-image">
        <img
          src=${cardData?.profile_image}
        />
      </div>
      <div class="author-details">
        <p class="author-name">${cardData?.name}</p>
        <p class="date">Posted on: ${cardData?.date}</p>
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
        <img src="./${cardData?.source_type}.png" alt="source image" />
        <a class="source-link" href=${cardData?.source_link}
          >Visit Source</a
        >
      </div>
    </div>
  
    `;

    card.innerHTML = cardContent;
    container.appendChild(card);
  });
}
