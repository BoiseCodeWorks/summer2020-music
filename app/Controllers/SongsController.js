import SongsService from "../Services/SongsService.js";
import store from "../store.js";

//Private
function _drawResults() {
    let results = store.State.results;
    let template = ""
    results.forEach(s => template += s.PreviewTemplate)
    document.getElementById('results').innerHTML = template
}

function _drawActiveSong() {
    let song = store.State.activeSong
    document.getElementById('active-song').innerHTML = song.ActiveTemplate
}

// _drawMySongs
function _drawMySongs() {
    let mySongs = store.State.mySongs;
    let template = ""
    mySongs.forEach(s => template += s.PreviewTemplate)
    document.getElementById('my-songs').innerHTML = template
}

//Public
export default class SongsController {
    constructor() {
        store.subscribe("results", _drawResults);
        store.subscribe("activeSong", _drawActiveSong);
        store.subscribe("mySongs", _drawMySongs);
    }

    search(event) {
        event.preventDefault();
        SongsService.search(event.target.query.value)
    }

    setActive(id) {
        debugger
        SongsService.setActive(id)
    }

    addSong() {
        SongsService.addSong()
    }

    deleteSong(id) {
        SongsService.deleteSong(id)
        event.stopPropagation();
    }
}
