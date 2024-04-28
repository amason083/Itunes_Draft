const form = document.querySelector('.js_form');
const nameField = form.querySelector('[name=Artist_Name]');
const countField = form.querySelector('[name=Song_Count]');
const songResults = document.querySelector('.js_itunes_songs');
let artistResult = null;
let countResult = null;
let results = null;
let link = null;
const messageContainer = document.querySelector('.js_message_container');
const actualResults = document.querySelector('.js_message_count');

async function loadSongs() {
    artistResult = encodeURIComponent(artistResult);
    countResult = encodeURIComponent(countResult);
    const data = await fetch(`https://itunes.apple.com/search?term=${artistResult}&media=music&limit=${countResult}`);
    const response = await data.json();
    results = response.results;
    songResults.innerHTML = '';
    if (results === null) {
        await fetchSongs();

    }
    displaySongs();
}


function renderSongs(results) {
        for (let x in results){
            return `
            <div
            class="song_item"
            data-id="${results.trackid}">
                <h2 class="song_name">${results.trackName}</h2>
                <p class="artist_name">${results.artistName}</p>
                <img
                    src="${results.artworkUrl100}"
                    alt="${results.trackName}" />
                <audio
                    controls
                    src="${results.previewUrl}">
                </audio>
            </div>
        `
        }
    }
    


function displaySongs() {
    songResults.innerHTML = '';
    actualResults.innerHTML = '';
    if (!results || results.length === 0) {
        songResults.innerHTML = '<p>No songs found.</p>';
        return;
    } songResults.innerHTML = results
    .map(renderSongs)
    .join('');

    actualResults.innerHTML = `<p>Found ${results.length} Songs</p>`
}

function pauseSong(){
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len; i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
    }, true);
}

function formSubmitted(event) {
    event.preventDefault();
    messageContainer.innerHTML = '';

    const artistNameVal = nameField.value;
    const countAmount = countField.value;
    
    if (artistNameVal.length === 0 || countAmount.length === 0) {
        messageContainer.innerHTML = 'Please enter Artist Name and count of songs.';
        return;
    } else if (Math.abs(countField.value) > 25) {
        countField.value = 25;
        messageContainer.innerHTML = 'Result Limit: 25 songs';
    } else {
        messageContainer.innerHTML = '';
    }

    artistResult = nameField.value.trim(artistResult).replace(' ','+');
    countResult = Math.abs(countField.value);
    loadSongs();

}

form.addEventListener('submit', formSubmitted);
pauseSong();