export default class Song {
    constructor(data) {
        this.id = data.trackId || data._id
        this.artist = data.artistName || data.artist
        this.album = data.collectionName || data.album
        this.title = data.trackName || data.title
        this.preview = data.previewUrl || data.preview
        this.price = data.trackPrice || data.price
        this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "500x500");
        this.mySong = data._id != undefined
        this.kind = data.kind
    }

    get PreviewTemplate() {
        return `
        <div class="media bg-info text-light d-flex p-2 m-1" onclick="app.songsController.setActive('${this.id}')">
            <img class="mr-3 img-fluid" src="${this.albumArt}" style="height: 60px">
            <div class="media-body">
            <h5 class="mt-0">${this.title}</h5>
               <p>${this.artist} | ${this.album} ${this.DeleteButton}</p>
               
            </div>
        </div>
        
        `
    }

    get DeleteButton() {
        if (this.mySong) {
            return `<i class="fa fa-times" onclick="app.songsController.deleteSong('${this.id}')"></i>`
        }
        return ''
    }

    get ActiveTemplate() {
        return `
        <div class="text-center mt-3">
            <img class="img-fluid" src="${this.albumArt}">
            <div class="">
                <h4 class="card-title">Title: ${this.title}</h4>
                <p class="card-text">${this.artist} | ${this.album}</p>
                ${this.Media}
                <button class="btn btn-success" onclick="app.songsController.addSong()">Add Song</button>
            </div>
        </div>
        `
    }

    get Media() {
        if (this.kind == "song") {
            return `<audio controls src="${this.preview}" autoplay ></audio>`
        }
        if (this.kind == "feature-movie") {
            return `<video controls src="${this.preview}" autoplay ></video>`
        }
        return ''
    }
}