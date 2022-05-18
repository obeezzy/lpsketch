import { Bitmap, Movie } from "./lpsketch/lpsketch.js";

function setupMovieModes() {
    function displayMode(modeButton) {
        document.querySelectorAll(".controls__mode__content")
            .forEach((modeContent) => {
            if (modeButton.dataset.mode === modeContent.dataset.mode)
                modeContent.style.display = "block";
            else
                modeContent.style.display = "none";
        });
    };

    document.querySelectorAll(".controls__mode__select > input[type='radio']")
        .forEach((modeButton) => {
        modeButton.onclick = () => displayMode(modeButton);
        if (modeButton.checked)
            displayMode(modeButton);
    });
}

function setupColorPickers() {
    const lp = document.getElementById("sketchpad");

    for (const led of lp.grid.ledRange()) {
        led.onclick = () => {
            const movieTabActive = document.getElementById("movie-tab").classList.contains("active");
            const bitmapColor = document.getElementById("bitmap-color-picker").value;
            const movieColor = document.getElementById("movie-color-picker").value;
            if (led.color)
                led.reset();
            else
                led.color = movieTabActive ? movieColor : bitmapColor;
            lp.sync();
        };
    }
}

function setupMovieRoll() {
    const lp = document.getElementById("sketchpad");
    const movieRoll = document.getElementById("movie-roll");
    const insertButton = document.getElementById("insert-button");
    const updateButton = document.getElementById("update-button");
    const deleteButton = document.getElementById("delete-button");
    const playButton = document.getElementById("play-button");
    const playButtonIcon = document.getElementById("play-button-icon");
    const previousFrameButton = document.getElementById("previous-frame-button");
    const nextFrameButton = document.getElementById("next-frame-button");
    const loopCheckBox = document.getElementById("loop-checkbox");
    const saveButton = document.getElementById("save-button");
    const loadButton = document.getElementById("load-button");
    const bitmapTab = document.getElementById("bitmap-tab");
    const movieColorPicker = document.getElementById("movie-color-picker");
    const framerateField = document.getElementById("framerate-field");

    movieRoll.addEventListener('activechange',
                                (e) => {
                                    movieRoll.render(lp, e.detail.sketchpad);
                                    lp.sync();
                                });
    insertButton.onclick = () => movieRoll.insert(lp);
    updateButton.onclick = () => movieRoll.updateActive(lp);
    deleteButton.onclick = () => movieRoll.removeActive();
    playButton.onclick = () => movieRoll.playing ?
                                movieRoll.stop() :
                                movieRoll.play({ framerate: framerateField.value });
    movieRoll.addEventListener('playingchange',
                                (e) => {
                                    playButtonIcon.src = e.detail.playing ?
                                                                "images/stop.svg" :
                                                                "images/play.svg";
                                    movieColorPicker.disabled = e.detail.playing;
                                    insertButton.disabled = e.detail.playing;
                                    updateButton.disabled = e.detail.playing;
                                    deleteButton.disabled = e.detail.playing;
                                    bitmapTab.disabled = e.detail.playing;
                                    framerateField.disabled = e.detail.playing;
                                    previousFrameButton.disabled = e.detail.playing;
                                    nextFrameButton.disabled = e.detail.playing;
                                    loopCheckBox.disabled = e.detail.playing;
                                });
    previousFrameButton.onclick = () => movieRoll.previous();
    nextFrameButton.onclick = () => movieRoll.next();
    loopCheckBox.onchange = () => movieRoll.loop = loopCheckBox.checked;
    saveButton.onclick = () => saveToFile();
    loadButton.onchange = () => loadFromFile();

    movieRoll.loop = loopCheckBox.checked;
}

function setupSync() {
    const lp = document.getElementById("sketchpad");
    const statusIndicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");
    lp.addEventListener("connectchange", (e) => {
        statusIndicator.style.backgroundColor = e.detail.connected ? "green" : "crimson";
        statusText.innerHTML = e.detail.connected ? "Connected" : "Not connected";
        if (e.detail.connected)
            lp.sync();
    });
    lp.connect();
}

function saveToFile() {
    const movieTabActive = document.getElementById("movie-tab").classList.contains("active");
    if (movieTabActive)
        saveMovie();
    else
        saveBitmap();
}

function saveMovie() {
    const movieRoll = document.getElementById("movie-roll");
    const saveButton = document.getElementById("save-button");
    const framerateField = document.getElementById("framerate-field");
    const movie = new Movie({ title: "title",
                              description: "description",
                              framerate: framerateField.value,
                              frames: movieRoll.frames });
    const movieData = movie.toString();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(movieData);
    saveButton.setAttribute("href", dataStr);
    saveButton.setAttribute("download", "final.movie.json");
}

function saveBitmap() {
    const lp = document.getElementById("sketchpad");
    const saveButton = document.getElementById("save-button");
    const bitmap = new Bitmap({ title: "title",
                                description: "description",
                                frame: lp.frame });
    const bitmapData = bitmap.toString();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(bitmapData);
    saveButton.setAttribute("href", dataStr);
    saveButton.setAttribute("download", "final.bitmap.json");
}

function loadFromFile() {
    const loadButton = document.getElementById("load-button");
    if (loadButton.files.length) {
        const file = loadButton.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = e => {
            const json = JSON.parse(e.target.result);
            if ("bitmap" in json)
                loadBitmap(json);
            else if ("frames" in json)
                loadMovie(json);
        };
    }
}

function loadMovie(json) {
    const lp = document.getElementById("sketchpad");
    const movieTab = document.getElementById("movie-tab");
    const movieRoll = document.getElementById("movie-roll");
    const framerateField = document.getElementById("framerate-field");
    const movie = Movie.fromJson(json)

    movieTab.click();
    lp.grid.clear();
    movieRoll.clear();
    for (const frame of movie.frames) {
        const sketchpad = document.createElement("lp-sketchpad");
        sketchpad.frame = frame;
        movieRoll.add(sketchpad);
    }

    framerateField.value = movie.framerate;
    movieRoll.first();
}

function loadBitmap(json) {
    const lp = document.getElementById("sketchpad");
    const bitmapTab = document.getElementById("bitmap-tab");
    const bitmap = Bitmap.fromJson(json);

    bitmapTab.click();
    lp.grid.clear();
    lp.frame = bitmap.frame;
    lp.sync();
}

window.onload = () => {
    setupMovieModes();
    setupColorPickers();
    setupMovieRoll();
    setupSync();
}
