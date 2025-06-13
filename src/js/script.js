import { fetchYouTubeData } from './data.js';

const musicContainer = document.getElementById('musicContainer');
const toggleBtn = document.getElementById("theme__toggle");
const htmlEl = document.documentElement;

// === Theme toggle ===
toggleBtn.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");

  const icon = toggleBtn.querySelector("i");
  icon.classList.toggle("fa-sun-bright");
  icon.classList.toggle("fa-moon");

  localStorage.setItem("theme", htmlEl.classList.contains("dark") ? "dark" : "light");
});

// === Load saved theme ===
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    htmlEl.classList.add("dark");
    toggleBtn.querySelector("i").classList.replace("fa-sun-bright", "fa-moon");
  }
});

// === Utility: Truncate long titles ===
function truncateTitle(title, length = 16) {
  return title.length > length ? title.slice(0, length) + '…' : title;
}

// === Main function: Render videos ===
async function renderVideos() {
  const videos = await fetchYouTubeData();

  // Only use this videoId for the local image
  const localImageVideoId = 'AM32gC3arEI';
  const localImagePath = './images/song1.png';

  videos.forEach(video => {
    const { videoId } = video.id;
    const { title, publishedAt, thumbnails } = video.snippet;
    const year = new Date(publishedAt).getFullYear();
    const shortTitle = truncateTitle(title, 16);

    // Determine image source
    const imageSrc = (videoId === localImageVideoId)
      ? localImagePath
      : thumbnails.medium.url;

    const songCard = document.createElement('div');
    songCard.classList.add('music-catalogue__item');
    songCard.innerHTML = `
      <div class="music-catalogue__img-wrapper">
        <img src="${imageSrc}" alt="${title}" />
      </div>
      <div class="music-catalogue__item-content">
        <h3>${shortTitle}</h3>
        <p>${year}</p>
        <button class="play-button" data-video-id="${videoId}">
          <i class="fa-solid fa-play"></i> Play
        </button>
      </div>
    `;

    musicContainer.appendChild(songCard);
  });

  // === Handle Play button click ===
  musicContainer.addEventListener('click', e => {
    const btn = e.target.closest('.play-button');
    if (btn) {
      const id = btn.dataset.videoId;
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    }
  });
}

renderVideos();
