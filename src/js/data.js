// data.js
const API_KEY = 'AIzaSyDvLZ7SENnqbWlUPR2YsWXGratQqdDvPIE';
const CHANNEL_ID = 'UCd7g2bMxgJHncQn3htSDUMQ';

export async function fetchYouTubeData() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.items.filter(item => item.id.kind === 'youtube#video');
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
}
