class Superclock {
  constructor(positionX, positionY, clockHeight, isStacked = false) {
    this.position = createVector(positionX, positionY);
    this.height = clockHeight;
    this.isStacked = isStacked;
    this.digits = [];
    this.createDigits();
  }

  update = () => {
    this.digits.forEach((digit) => digit.update());
  };

  show = () => {
    this.digits.forEach((digit) => digit.show());
  };

  createDigits = () => {
    for (let digitIndex = 0; digitIndex < 4; digitIndex++) {
      if (this.isStacked) {
        this.digits.push(
          new Digit(
            this.position.x + (2 * Math.floor(digitIndex % 2) - 1) * this.height / 6,
            this.position.y + (Math.floor(digitIndex / 2) - 0.5) * this.height * 0.5,
            this.height / 2,
            currentTime[digitIndex],
            4
          )
        );
      } else {
        this.digits.push(
          new Digit(
            this.position.x + ((2 / 3) * digitIndex - 1) * this.height,
            this.position.y,
            this.height,
            currentTime[digitIndex],
            4
          )
        );
      }
    }
  }

  setTime = (newTime) => {
    this.digits.forEach((digit, index) => {
      digit.setDigit(newTime[index]);
    });
  };
}
