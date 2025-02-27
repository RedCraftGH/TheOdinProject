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
    clearPixelIndex();
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
    clearPixelIndex();
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

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {

        // Add the current point to the points list
        line.push([x1, y1]);

        // If we've reached the destination point, stop
        if (x1 === x2 && y1 === y2) {
            break;
        }

        // 2 * error term
        const e2 = 2 * err;

        // Step in the x-direction if needed
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }

        // Step in the y-direction if needed
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    buildLine(line);
}

function buildLine(line) {

    for (const point of line) {

        let pixelId = point[0] + (point[1] * width);
        
        pixels[pixelId].style.backgroundColor = "darkgray";
    }
}

function buildPixelIndex(pixel) {

    let pixelId = pixels.indexOf(pixel);
    console.log(pixelId);
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
    pixelY /= width;

    if (pixelIndex.firstPixel.x === null) {

        pixelIndex.firstPixel.x = pixelX;
        pixelIndex.firstPixel.y = pixelY;
    } else if (pixelIndex.secondPixel.x === null) {

        pixelIndex.secondPixel.x = pixelX;
        pixelIndex.secondPixel.y = pixelY;

        findPixels(pixelIndex);
    } else {

        pixelIndex.firstPixel.x = pixelIndex.secondPixel.x;
        pixelIndex.firstPixel.y = pixelIndex.secondPixel.y;
        pixelIndex.secondPixel.x = null;
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
