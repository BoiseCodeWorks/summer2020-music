import store from "../store.js";
import Song from "../Models/Song.js";

const _sandboxApi = axios.create({
    baseURL: "https://bcw-sandbox.herokuapp.com/api/classroom/songs",
    timeout: 15000
})

class SongsService {
    constructor() {
        this.getMySongs()
    }
    setActive(id) {
        let found = store.State.results.find(s => s.id == id);
        if (!found) {
            found = store.State.mySongs.find(s => s.id == id);
        }
        store.commit("activeSong", found)
    }

    //GET
    getMySongs() {
        _sandboxApi.get('')
            .then(res => {
                let songs = res.data.data.map(s => new Song(s))
                store.commit("mySongs", songs)
            })
    }
    //POST
    addSong() {

        _sandboxApi.post("", store.State.activeSong)
            .then(res => {
                this.getMySongs();
            })
            .catch(e => console.error(e))
    }

    //DELETE
    deleteSong(id) {
        _sandboxApi.delete(id)
            .then(res => {
                this.getMySongs()
            })
            .catch(e => console.error(e))
    }



    /**
    * Takes in a search query and retrieves the results that will be put in the store
    * @param {string} query
    */
    search(query) {
        if (query.toLowerCase() == "nelly") {
            window.alert('No')
            return
        }
        //NOTE You will not need to change this method
        let url = "https://itunes.apple.com/search?callback=?&term=" + query;
        // @ts-ignore
        $.getJSON(url)
            .then(res => {
                let results = res.results.map(rawData => new Song(rawData));
                store.commit("results", results);
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}

const service = new SongsService();
export default service;
