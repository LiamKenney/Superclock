class Clock {
  constructor(
    xPosition,
    yPosition,
    size,
    initTime,
    showTicks = false,
    accurateHourHand = false
  ) {
    this.position = createVector(xPosition, yPosition);
    this.size = size;
    this.time = initTime;
    this.showTicks = showTicks;
    if (showTicks) {
      this.tickSize = 10;
      this.numTicks = 12;
      this.tickVector = createVector(this.tickSize);
    }
    this.hourHandSize = this.size * 0.4;
    this.minuteHandSize = this.size * 0.4;
    this.accurateHourHand = accurateHourHand;
    this.hourHand = this.getHourHand(this.time);
    this.minuteHand = this.getMinuteHand(this.time);
    this.oldHourHand = createVector();
    this.oldMinuteHand = createVector();
    this.newHourHand = createVector();
    this.newMinuteHand = createVector();
    this.isUpdating = false;
    this.movementPosition = 0;
    this.movementDelta = 0.0001;
    this.borderColor = [100];
    this.hourHandColor = this.setHandColor();
    this.minuteHandColor = this.setHandColor();
  }

  update = () => {
    if (this.isUpdating) {
      let nextPosition = this.movementPosition + this.movementDelta;
      this.movementPosition = nextPosition > 1 ? 1 : nextPosition;
      this.isUpdating = this.movementPosition < 1;
      this.hourHand.set(
        p5.Vector.lerp(
          this.oldHourHand,
          this.newHourHand,
          this.movementPosition
        )
      );
      this.minuteHand.set(
        p5.Vector.lerp(
          this.oldMinuteHand,
          this.newMinuteHand,
          this.movementPosition
        )
      );
    }
  };

  show = () => {
    push();
    {
      noFill();
      stroke(this.borderColor);
      strokeWeight(2);
      translate(this.position.x, this.position.y);
      rotate(-PI / 2);
      ellipse(0, 0, this.size, this.size);
      if (this.showTicks) {
        for (let tickIndex = 0; tickIndex < this.numTicks; tickIndex++) {
          push();
          rotate((TWO_PI * tickIndex) / this.numTicks);
          translate(this.size / 2 - this.tickSize, 0);
          line(0, 0, this.tickVector.x, this.tickVector.y);
          pop();
        }
      }
      push();
      {
        strokeWeight(3);
        strokeCap(ROUND);
        stroke(this.hourHandColor);
        line(0, 0, this.hourHand.x, this.hourHand.y);
        stroke(this.minuteHandColor);
        line(0, 0, this.minuteHand.x, this.minuteHand.y);
      }
      pop();
    }
    pop();
  };

  setTime = (newTime) => {
    this.isUpdating = true;
    this.movementPosition = 0;
    this.oldHourHand = this.hourHand;
    this.oldMinuteHand = this.minuteHand;
    this.newHourHand.set(this.getHourHand(newTime));
    this.newMinuteHand.set(this.getMinuteHand(newTime));
    this.hourHandColor = this.setHandColor();
    this.minuteHandColor = this.setHandColor();
  };

  setHandColor = () => {
    return colorLerp(this.position.y / height);
  };

  getHourHand = (time) => {
    let hours = this.getHours(time);
    let angle = (hours / 12) * TWO_PI;
    return p5.Vector.fromAngle(angle, this.hourHandSize);
  };

  getMinuteHand = (time) => {
    let minutes = this.getMinutes(time);
    let angle = (minutes / 60) * TWO_PI;
    return p5.Vector.fromAngle(angle, this.minuteHandSize);
  };

  getHours = (time) => {
    let splitTime = time.split(":");
    return +splitTime[0] + (this.accurateHourHand ? splitTime[1] / 60 : 0);
  };

  getMinutes = (time) => {
    return +time.split(":")[1];
  };
}
