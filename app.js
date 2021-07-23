const canvas = document.getElementById("jsCanvas"); // check out canvas in MDN website
canvas.width = 700; // canvas needs pixel modifier size not only css size
canvas.height = 700;

const context = canvas.getContext("2d"); // context handles pixels in canvas
context.strokeStyle = "#2c2c2c"; // line color
context.lineWidth = 2.5;

let painting = false;

function startPainting() {
    painting = true;
}


function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    // in event, clientX and clientY are whole window coordinate.
    // offsetX and offsetY are canvas coordinate
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        context.beginPath(); // path is a line
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function onMouseDown(event) {
    console.log(event);
    painting = true;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // when mouse clicked
    canvas.addEventListener("mouseup", stopPainting); // when mouse unclicked
    canvas.addEventListener("mouseleave", stopPainting); // when mouse leave the canvas
}