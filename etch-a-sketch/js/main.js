let slider = document.querySelector("#gridsize");
let screen = document.querySelector(".screen");
let display = document.querySelector("#display");

const DISPLAY_RATIO = 2;
const ERROR_MARGIN = 0.999;

let height = slider.value;
let width = height * DISPLAY_RATIO;

let active = false;

let pixels = [];

let pixelIndex = {
    firstPixel: {
        x: null,
        y: null
    },
    secondPixel: {
        x: null,
        y: null
    }
}

function buildEtchSketch(height) {

    let dimensions = calcDimensions(height);
    pixels = [];
    createDivisions(dimensions);
}

function createDivisions(dimensions) {

    let fragment = document.createDocumentFragment();

    for (i = 0; i < dimensions[0]; i++) {

        let pixel = document.createElement("div");
        pixel.style.width = dimensions[1] + "px";
        pixel.style.height = dimensions[2] + "px";
        pixels.push(pixel);
        fragment.appendChild(pixel);
    }

    screen.appendChild(fragment);
}

function calcDimensions(height) {

    let area = height * width;
    let pixelWidth = (screen.clientWidth / width) * ERROR_MARGIN;
    let pixelHeight = screen.clientHeight / height;

    return [area, pixelWidth, pixelHeight];
}

function clearScreen() {

    active = false;

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

function managePixels(e) {

    active = true;

    if (e.target !== screen && active) {

        buildPixelIndex(e.target);
        e.target.style.backgroundColor = "darkgray";
    }
}

function rebuildScreen() {
    
    height = document.querySelector("#gridsize").value;
    width = height * DISPLAY_RATIO;
    active = false;
    removeDivisions();
    buildEtchSketch(height);
}

function updateDisplay() {

    height = document.querySelector("#gridsize").value;
    width = height * DISPLAY_RATIO;
    display.innerHTML = `${width}x${height}`;
}

function findPixels(pixelIndex) {

    let x1 = pixelIndex.firstPixel.x;
    let y1 = pixelIndex.firstPixel.y;

    let x2 = pixelIndex.secondPixel.x;
    let y2 = pixelIndex.secondPixel.y;

    let line = [];

    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? width : -width;
    let err = dx - dy;
    console.log({dx, dy});
    console.log({sx, sy});
    console.log({err});

    do {
        line.push({x: x1, y: y1});
        console.log({x: x1, y: y1});

        if (dx !== 0 && x1 != x2) {

            x1 += sx;
            console.log({x1});
        }
        if (dy !== 0 && y1 != y2) {

            y1 += sy;
            console.log({y1});
        }
        
        // if (2 * err > -dy) {
        //     err -= dy;
        //     x1 += sx;
        // }
        // if (2 * err < dx) {
        //     err += dx;
        //     y1 += sy;
        // }
    }
    while (!(x1 == x2 && y1 == y2));

    console.log(line);
    buildLine(line);   
}

function buildLine(line) {

    for (const point of line) {

        let pixelId = point.x + point.y;
        
        pixels[pixelId].style.backgroundColor = "darkgray";
    }
}

function buildPixelIndex(pixel) {

    let pixelId = pixels.indexOf(pixel);
    let pixelX;
    let pixelY;

    //compare the pixel id to the pixel id of the first pixel in x row
    //if greater than
        //continue to the next row
        //return to line 1
    //else
        //pixel must be on the previous row

    for (i = 0; i <= width * height; i += width) {

        if (pixelId < i) {

            pixelY = i -= width;
            break;
        }
    }
    pixelX = pixelId - pixelY;

    if (pixelIndex.firstPixel.x === null) {

        pixelIndex.firstPixel.x = pixelX;
        pixelIndex.firstPixel.y = pixelY;
        console.log(pixelIndex);
    } else if (pixelIndex.secondPixel.x === null) {

        pixelIndex.secondPixel.x = pixelX;
        pixelIndex.secondPixel.y = pixelY;

        findPixels(pixelIndex);
        console.log(pixelIndex);
    } else {

        clearPixelIndex();
        buildPixelIndex(pixel);
    }
}

function clearPixelIndex() {

    pixelIndex = {
        firstPixel: {
            x: null,
            y: null
        },
        secondPixel: {
            x: null,
            y: null
        }
    }
}

// screen.addEventListener('mouseover', managePixels);

screen.addEventListener('mousedown', managePixels);

buildEtchSketch(height);
updateDisplay();
