const songs = [
  { title: "Bad Habits", src: "./music/bad habits.mp3" },
  { title: "Devil in a new dress", src: "./music/devil in a new dress.mp3" },
  { title: "Die with a smile", src: "./music/die with a smile.mp3" },
  {title: "The night we met", src: "./music/the night we met.mp3" },
  {title: "Khamaaj", src: "./music/Khamaaj.mp3" },
  {title: "Pick up da call", src: "./music/SANJAY JI PLEASE PICKUP THE PHONE NAME RINGTONESANJAY RINGTONEAAP KO KISI NE DIL SE YAD KIYA HAI.mp3" },
  {title: "Passionfruit", src: "./music/Passionfruit.mp3" },
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


const radioImg = document.querySelector(".background");

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    radioImg.src = "./img/final_radio1.png";
  } else {
    audio.pause();
    radioImg.src = "./img/final_radio.png";
  }
}


const volumeKnob = document.getElementById("volumeKnob");
let isDragging = false;
let currentRotation = 0;

volumeKnob.addEventListener("mousedown", () => isDragging = true);
document.addEventListener("mouseup", () => isDragging = false);

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Calculate rotation based on mouse X movement
  currentRotation += e.movementX * 0.5; // sensitivity
  currentRotation = Math.max(-100, Math.min(100, currentRotation)); // limit rotation

  // Apply rotation to knob
  volumeKnob.style.transform = `rotate(${currentRotation}deg)`;

  // Map rotation (-100 to 100) to volume (0 to 1)
  const volume = (currentRotation + 100) / 200;
  audio.volume = volume;
});
document.addEventListener('keydown', (event) => {
  const step = 0.05; // volume change step

  if (event.key === 'ArrowUp') {
    // Increase volume
    audio.volume = Math.min(1, audio.volume + step);
    updateVolumeKnob(audio.volume);
    event.preventDefault(); // prevent page scroll
  } else if (event.key === 'ArrowDown') {
    // Decrease volume
    audio.volume = Math.max(0, audio.volume - step);
    updateVolumeKnob(audio.volume);
    event.preventDefault(); // prevent page scroll
  }
});

// Helper function to update knob rotation based on volume (0 to 1)
function updateVolumeKnob(volume) {
  // Map volume (0 to 1) to rotation (-100deg to 100deg)
  const rotation = (volume * 200) - 100;
  volumeKnob.style.transform = `rotate(${rotation}deg)`;
  
  // Update currentRotation to sync drag and keyboard controls
  currentRotation = rotation;
}
const volumeLevel = document.getElementById("volumeLevel");

function updateVolumeUI(volume) {
  // Update knob rotation (already done before)
  const rotation = (volume * 200) - 100;
  volumeKnob.style.transform = `rotate(${rotation}deg)`;
  currentRotation = rotation;

  // Update vertical bar height
  volumeLevel.style.height = `${volume * 100}%`;
}

// Update this wherever volume changes:
audio.addEventListener("volumechange", () => {
  updateVolumeUI(audio.volume);
});
