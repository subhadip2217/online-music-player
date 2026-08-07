const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/music1/300/300"
  },
  {
    title: "SoundHelix Song 2",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/music2/300/300"
  },
  {
    title: "SoundHelix Song 3",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/music3/300/300"
  },
  {
    title: "SoundHelix Song 8",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://picsum.photos/seed/music4/300/300"
  },
  {
    title: "SoundHelix Song 14",
    artist: "T. Schürger",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    cover: "https://picsum.photos/seed/music5/300/300"
  }
];

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// Elements
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

// Play / Pause
function playSong() {
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  cover.classList.add('playing');
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  cover.classList.remove('playing');
  audio.pause();
}

// Next / Previous
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  updatePlaylist();
  if (isPlaying) playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  updatePlaylist();
  if (isPlaying) playSong();
}

// Update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Time display
  currentTimeEl.textContent = formatTime(currentTime);
  if (duration) durationEl.textContent = formatTime(duration);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Set progress on click
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Volume
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Playlist
function createPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${song.cover}" alt="cover">
      <div class="info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
    `;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      playSong();
      updatePlaylist();
    });
    playlistEl.appendChild(li);
  });
}

function updatePlaylist() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentSongIndex);
  });
}

// Event listeners
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressBar.addEventListener('click', setProgress);

// Init
loadSong(songs[currentSongIndex]);
createPlaylist();
updatePlaylist();
audio.volume = 0.8;
