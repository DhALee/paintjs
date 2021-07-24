const canvas = document.getElementById("jsCanvas"); // check out canvas in MDN website
const context = canvas.getContext("2d"); // context handles pixels in canvas
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE; // canvas needs pixel modifier size not only css size
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = DEFAULT_COLOR; // default line color
context.fillStyle = DEFAULT_COLOR;
context.lineWidth = 2.5;


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

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}

function handleRangeChange(event) {
    thickness = event.target.value;
    context.lineWidth = thickness;
}

function handleModeClick() {
    if (filling == true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault(); // forbid save img through right click
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // default type is png
    const link = document.createElement("a");
    link.href = image
    link.download = "paintjs";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // when mouse clicked
    canvas.addEventListener("mouseup", stopPainting); // when mouse unclicked
    canvas.addEventListener("mouseleave", stopPainting); // when mouse leave the canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}