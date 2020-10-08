const background = document.querySelector('#background');
let thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');

const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

songIndex = [0];
songs = ['./assets/music/london_calling.mp3', './assets/music/rock_the_casbah.mp3']; // array stocking paths for single songs
thumbnails = ['./assets/image/london_calling_cover.png', './assets/image/rock_the_casbah_cover.png']; // array stocking paths for thumbnails covers
songArtists = ['The Clash', 'The Clash']; // array stocking artists
songTitles = ["London Calling", "Rock the casbah"]; // array stocking song titles

// function where play-pause element changes based on playing boolean value - if play button clicked, change pPause.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause(){
    if (playing) {
        const song = document.querySelector('#song');
        thumbnail =  document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause-solid.svg"; // change the play button to pause button
        thumbnail.style.transform = "scale(1.15)"; // slightly zoom in the album cover

        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play-solid.svg";
        thumbnail.style.transform = "scale(1)";

        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track
function nextSong(){
    songIndex ++;
    if (songIndex > 1){
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtist[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 1;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};