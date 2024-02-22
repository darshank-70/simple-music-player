const songsList = [
  {
    musicName: "jacinto-1.mp3",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
    imageName: "jacinto-1.jpg",
  },
  {
    musicName: "jacinto-2.mp3",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
    imageName: "jacinto-1.jpg",
  },
  {
    musicName: "jacinto-3.mp3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
    imageName: "jacinto-1.jpg",
  },
  {
    musicName: "metric-1.mp3",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
    imageName: "jacinto-1.jpg",
  },
];
let audioElement = document.querySelector("audio");
let imgElement = document.querySelector("img");
let title = document.querySelector("#title");
let artistElement = document.querySelector("#artist");
let pausePlayBtn = document.querySelector("#play");
pausePlayBtn.addEventListener("click", playOrPause);

let previousBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
previousBtn.addEventListener("click", previousAudio);
nextBtn.addEventListener("click", nextAudio);
let currentSong = 0;
let isPlaying = false;
function loadSong(song) {
  audioElement.src = `music/${song.musicName}`;
  imgElement.src = `img/${song.imageName}`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
}

function playOrPause() {
  isPlaying ? pauseAudio() : playAudio();
}
//we can use .play() .pause() from audio
function playAudio() {
  pausePlayBtn.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
  audioElement.play();
}
function pauseAudio() {
  pausePlayBtn.classList.replace("fa-pause", "fa-play");

  isPlaying = false;
  audioElement.pause();
}
function previousAudio() {
  if (currentSong > 0) {
    currentSong--;
  }
  loadSong(songsList[currentSong]);
  playAudio();
}
function nextAudio() {
  if (currentSong < songsList.length) {
    currentSong++;
  }

  loadSong(songsList[currentSong]);
  playAudio();
}
function init() {
  loadSong(songsList[0]);
}
///main
//initially 1st song has to be loaded
init();
