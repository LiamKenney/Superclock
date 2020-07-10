var verbose = true;
var superclock;
var backgroundColor = [10];
var stacked = true;
var currentTime;
const colorStore = ["#003f5a", "#007a7a", "#ebd9c8", "#fea02f", "#de6600"];

function setup() {
  stacked
    ? createCanvas(windowWidth, windowHeight)
    : createCanvas(windowWidth, windowWidth * 0.37);
  currentTime = getCurrentTime();
  initSketch();
}

function draw() {
  background(backgroundColor);
  updateCurrentTime();
  superclock.update();
  superclock.show();
  strokeWeight(4);
  stroke(255, 0, 0);
}

function showColorLerpBorders() {
  let rectHeight = 10;
  let numRects = Math.floor(height / rectHeight);
  for (let rectIndex = 0; rectIndex < numRects; rectIndex++) {
    push();
    noStroke();
    fill(colorLerp(rectIndex / numRects));
    rect(0, rectIndex * rectHeight, width, rectHeight);
  }
}

function updateCurrentTime() {
  let newTime = getCurrentTime();
  if (newTime !== currentTime) {
    superclock.setTime(newTime);
    currentTime = newTime;
  }
}

function getCurrentTime() {
  let hours = hour().toString();
  hours = hours.length < 2 ? "0" + hours : hours;
  let minutes = minute().toString();
  minutes = minutes.length < 2 ? "0" + minutes : minutes;
  return hours + minutes;
}

function windowResized() {
  stacked
    ? resizeCanvas(windowWidth, windowHeight)
    : resizeCanvas(windowWidth, windowWidth * 0.37);
  initSketch();
}

function initSketch() {
  background(backgroundColor);
  // showColorLerpBorders();
  superclock = new Superclock(width / 2, height / 2, height, stacked);
}

function logger() {
  if (verbose) {
    console.log(Array.prototype.join.call(arguments, " "));
  }
}

function colorLerp(amount, ipercDayOver) {
  const hour = +currentTime.slice(0, 2);
  const minute = +currentTime.slice(2, 4);
  const percDayOver = (hour + minute / 60) / 24;
  // const percDayOver = ipercDayOver || 0;
  const borders = [];
  let runningBorderFilled = 0,
    lowerBorderIndex = 0;
  for (let borderIndex = 0; borderIndex < colorStore.length; borderIndex++) {
    let newBorder =
      1 / colorStore.length +
      (((borderIndex - 2) * 1) / colorStore.length) * (0.5 - percDayOver);
    runningBorderFilled += newBorder;
    borders[borderIndex] = runningBorderFilled;
    lowerBorderIndex =
      amount >= runningBorderFilled ? borderIndex : lowerBorderIndex;
  }
  const lowerColor = color(colorStore[lowerBorderIndex]);
  const upperColor = color(colorStore[lowerBorderIndex + 1]);
  const lerpAmount = amount - borders[lowerBorderIndex];
  // colors(lowerColor);
  // colors(upperColor);
  // logger(amount, lowerBorderIndex, lerpAmount);
  logger("Borders:", borders);
  return lerpColor(lowerColor, upperColor, lerpAmount);
}

function colors(icolor) {
  logger(red(icolor), green(icolor), blue(icolor));
}
