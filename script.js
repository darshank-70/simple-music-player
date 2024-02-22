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
    imageName: "jacinto-2.jpg",
  },
  {
    musicName: "jacinto-3.mp3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
    imageName: "jacinto-3.jpg",
  },
  {
    musicName: "metric-1.mp3",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
    imageName: "metric-1.jpg",
  },
];
let audioElement = document.querySelector("audio");
let imgElement = document.querySelector("img");
let title = document.querySelector("#title");
let artistElement = document.querySelector("#artist");
let pausePlayBtn = document.querySelector("#play");
pausePlayBtn.addEventListener("click", playOrPause);
document.addEventListener("keyup", (e) => {
  e.key == " " ? playOrPause() : null;
});
const progress = document.querySelector(".progress");

const progressContainer = progress.parentElement;
progressContainer.addEventListener("click", seekAudio);

audioElement.addEventListener("timeupdate", updateProgressBar);

let previousBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
previousBtn.addEventListener("click", previousAudio);
nextBtn.addEventListener("click", nextAudio);

let durationElement = document.querySelector("#duration");
let currentTimeElement = document.querySelector("#current-time");

let currentSong = 0;
let isPlaying = false;
function loadSong(song) {
  console.log(song);
  audioElement.src = `music/${song.musicName}`;
  imgElement.src = `img/${song.imageName}`;
  console.log(`img/${song.imageName}`);
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
  if (currentSong < songsList.length - 1) {
    currentSong++;
  }

  loadSong(songsList[currentSong]);
  playAudio();
}
function updateProgressBar(e) {
  //inside the event's srcElement obj, we have duration and currentTime
  //destructuring
  let { currentTime, duration } = e.srcElement;
  // console.log(currentTime, duration);

  //the loading of audio can be late and duration will be NaN to avoid that,
  if (duration) {
    //1. update the progress Bar in UI
    let progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";

    //2. update the duration Element
    let durationMinutes = `${duration / 60}`;
    durationElement.textContent = durationMinutes
      .substring(0, 4)
      .replace(".", ":");
  }
  //3. update the current time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
  currentTimeElement.textContent = currentMinutes + ":" + currentSeconds;
}
function seekAudio(e) {
  console.log(e);
  //we have this.clientWidth to get the progress container's maximum width
  let totalWidth = this.clientWidth;

  //we get offsetX to get width at clicked position
  let { offsetX } = e;
  //divide them to get percentage & update it
  progress.style.width = `${(offsetX / totalWidth) * 100}%`;
  //audio element have a property called duration (in seconds) update it
  //by multiplying it to offX/total
  let { duration } = audioElement;

  audioElement.currentTime = (offsetX / totalWidth) * duration;
  console.log((offsetX / totalWidth) * duration);
}
function init() {
  loadSong(songsList[0]);
}

///main
//initially 1st song has to be loaded
init();
