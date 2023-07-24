import { Component } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'snail';

  snailOrientation: string = './../assets/snail-forwards.png';

  lastSvenPosition: Position = { x: 1, y: 1 };
  currentSvenPosition: Position = { x: 1, y: 1 };

  ngOnInit() {
    setInterval(() => {
      // is sven doing horizontal or vertical movement?
      if (this.getRandomZeroOrOne()) {
        // sven is doing horizontal movement
        this.moveHorizontal();
      } else {
        // sven is doing vertical movement
        this.moveVertical();
      }

      // find out sven's orientation
      if (this.lastSvenPosition.x > this.currentSvenPosition.x) {
        this.snailOrientation = './../assets/snail-backwards.png';
      } else {
        this.snailOrientation = './../assets/snail-forwards.png';
      }

      document.getElementById('snail-box')!.style.gridColumnStart =
        this.currentSvenPosition.x.toString();
      document.getElementById('snail-box')!.style.gridRowStart =
        this.currentSvenPosition.y.toString();
    }, 1000);
  }

  getRandomZeroOrOne() {
    return Math.round(Math.random()); // Generates either 0 or 1 randomly
  }

  // HORIZONTAL MOVEMENT
  moveHorizontal() {
    // record sven's current position in memory before he moves
    this.lastSvenPosition.x = this.currentSvenPosition.x;
    // is he at the extremes of the garden?
    if (this.currentSvenPosition.x === 31) {
      this.moveLeft();
    } else if (
      this.currentSvenPosition.x === 1 ||
      this.currentSvenPosition.x === 0
    ) {
      this.moveRight();
    } else {
      // if he's not at the extremes, sven can choose
      if (this.getRandomZeroOrOne()) {
        // 1, so move forward
        this.moveRight();
      } else {
        // 0, so move backward
        this.moveLeft();
      }
    }
  }

  moveLeft() {
    this.currentSvenPosition.x -= 1;
  }

  moveRight() {
    this.currentSvenPosition.x += 1;
  }

  // VERTICAL MOVEMENT
  moveVertical() {
    // record sven's current position in memory before he moves
    this.lastSvenPosition.y = this.currentSvenPosition.y;
    // is he at the extremes of the garden?
    if (this.currentSvenPosition.y === 30) {
      this.moveUp();
    } else if (
      this.currentSvenPosition.y === 0 ||
      this.currentSvenPosition.y === 1
    ) {
      this.moveDown();
    } else {
      // if he's not at the extremes, sven can choose
      if (this.getRandomZeroOrOne()) {
        // 1, so move up
        this.moveUp();
      } else {
        // 0, so move down
        this.moveDown();
      }
    }
  }

  moveDown() {
    this.currentSvenPosition.y += 1;
  }

  moveUp() {
    this.currentSvenPosition.y -= 1;
  }
}
