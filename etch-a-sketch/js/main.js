let lengthAndWidth = 100;

let active = false;

let screen = document.querySelector(".screen");

let pixels = [];

const ERROR_MARGIN = 0.999;

function buildEtchSketch(lengthAndWidth) {

    let dimensions = calcDimensions(lengthAndWidth);
    createDivisions(dimensions);
    initPixels(pixels);
    console.log(pixels);
}

function createDivisions(dimensions) {

    for (i = 0; i < dimensions[0]; i++) {

        let pixel = document.createElement("div");
        pixel.style.width = dimensions[1] + "px";
        pixel.style.height = dimensions[2] + "px";
        pixels.push(pixel);
        screen.appendChild(pixel);
    }
}

function calcDimensions(lengthAndWidth) {

    let area = lengthAndWidth * lengthAndWidth;
    let pixelWidth = (screen.clientWidth / lengthAndWidth) * ERROR_MARGIN;
    let pixelHeight = screen.clientHeight / lengthAndWidth;

    console.log([area, pixelWidth, pixelHeight]);

    return [area, pixelWidth, pixelHeight];
}

function initPixels(pixels) {

    for (let pixel of pixels) {

        pixel.addEventListener('mouseover', updatePixel);
    }
}

function updatePixel(e) {

    if (active) {

        e.target.style.backgroundColor = "gray";
    }
}

function clearScreen() {

    for (let pixel of pixels) {

        pixel.style.backgroundColor = "#C0C0C0";
    }
}

function toggleActive() {
    
    active = !active;
}

function removeDivisions() {

    for (let pixel of pixels) {

        pixel.remove();
    }
}

window.addEventListener('mousedown', toggleActive);

buildEtchSketch(lengthAndWidth);