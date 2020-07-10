class Digit {
  constructor(positionX, positionY, digitHeight, digit, spacing = 0) {
    this.numClocksX = 4;
    this.numClocksY = 6;
    this.position = createVector(positionX, positionY);
    this.clockSize = digitHeight / this.numClocksY - spacing;
    this.digit = digit;
    this.interClockSpacing = spacing;
    this.width = this.clockSize * this.numClockX;
    this.height = this.clockSize * this.numClockY;
    this.numClocks = this.numClockX * this.numClockY;
    this.clocks = this.createClocksArray();
  }

  update = () => {
    this.clocks.forEach((clock) => clock.update());
  };

  show = () => {
    this.clocks.forEach((clock) => {
      clock.show();
    });
  };

  setDigit = (newDigit) => {
    this.digit = newDigit;
    this.clocks.forEach((clock, index) => {
      let xIndex = index % this.numClocksX;
      let yIndex = Math.floor(index / this.numClocksX);
      clock.setTime(this.getClockTime(xIndex, yIndex));
    });
  };

  createClocksArray = () => {
    let clocksArray = [];
    for (let clockIndexY = 0; clockIndexY < this.numClocksY; clockIndexY++) {
      for (let clockIndexX = 0; clockIndexX < this.numClocksX; clockIndexX++) {
        let newClock = this.createClock(clockIndexX, clockIndexY);
        clocksArray.push(newClock);
      }
    }
    return clocksArray;
  };

  createClock = (xIndex, yIndex) => {
    let xPosition =
      this.position.x +
      (-3 / 2 + xIndex) * (this.clockSize + this.interClockSpacing);
    let yPosition =
      this.position.y +
      (-5 / 2 + yIndex) * (this.clockSize + this.interClockSpacing);
    let time = this.getClockTime(xIndex, yIndex);
    return new Clock(xPosition, yPosition, this.clockSize, time);
  };

  getClockTime = (xIndex, yIndex) => {
    return digitStore["times"][
      digitStore["digits"][this.digit][yIndex][xIndex]
    ];
  };
}
