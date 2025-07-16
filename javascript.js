const songs = [
  { title: "Bad Habits", src: "./music/bad habits.mp3" },
  { title: "Devil in a new dress", src: "./music/devil in a new dress.mp3" },
  { title: "Die with a smile", src: "./music/die with a smile.mp3" },
  {title: "The night we met", src: "./music/the night we met.mp3" },
  {title: "Khamaaj", src: "./music/Khamaaj.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

function loadSong(index) {
  const song = songs[index];
  const spans = title.querySelectorAll('span');
  spans.forEach(span => span.textContent = song.title);
  title.textContent = song.title;
  audio.src = song.src;
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function changeSong(direction) {
  currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Initial Load
loadSong(currentSongIndex);

function updateProgressSmooth() {
  if (!audio.paused) {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
  requestAnimationFrame(updateProgressSmooth);
}

requestAnimationFrame(updateProgressSmooth);

function toggleSongList() {
  const list = document.getElementById("songList");
  list.style.display = list.style.display === "block" ? "none" : "block";
}

function playSelectedSong(index) {
  currentSongIndex = index;
  loadSong(currentSongIndex);
  audio.play();
  toggleSongList(); // close list after selecting
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // prevent page scrolling
    togglePlayPause();
  } else if (e.code === "ArrowRight") {
    changeSong(1);
  } else if (e.code === "ArrowLeft") {
    changeSong(-1);
  }
});

