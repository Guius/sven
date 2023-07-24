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
    /**
     * first block is gridColumnStart 1; last is gridColumnStart 5
     */
    setInterval(() => {
      // is sven doing horizontal or vertical movement?
      if (this.getRandomZeroOrOne()) {
        // sven is doing horizontal movement
        // if sven is at the end of the row, go backwards
        if (this.currentSvenPosition.x === 30) {
          this.lastSvenPosition.x = this.currentSvenPosition.x;
          this.currentSvenPosition.x -= 1;
        } else if (this.currentSvenPosition.x === 1) {
          // if sven is at the start of the row, go forwards
          this.lastSvenPosition.x = this.currentSvenPosition.x;
          this.currentSvenPosition.x += 1;
        } else {
          // if he's not at the extremes, sven can choose
          if (this.getRandomZeroOrOne()) {
            // 1, so move forward
            this.lastSvenPosition.x = this.currentSvenPosition.x;
            this.currentSvenPosition.x += 1;
          } else {
            // 0, so move backward
            this.lastSvenPosition.x = this.currentSvenPosition.x;
            this.currentSvenPosition.x -= 1;
          }
        }
      } else {
        // sven is doing vertical movement
        // if sven is at the end of the column, go backwards
        if (this.currentSvenPosition.y === 30) {
          this.lastSvenPosition.y = this.currentSvenPosition.y;
          this.currentSvenPosition.y -= 1;
        } else if (this.currentSvenPosition.y === 1) {
          // if sven is at the start of the row, go forwards
          this.lastSvenPosition.y = this.currentSvenPosition.y;
          this.currentSvenPosition.y += 1;
        } else {
          // if he's not at the extremes, sven can choose
          if (this.getRandomZeroOrOne()) {
            // 1, so move forward
            this.lastSvenPosition.y = this.currentSvenPosition.y;
            this.currentSvenPosition.y += 1;
          } else {
            // 0, so move backward
            this.lastSvenPosition.y = this.currentSvenPosition.y;
            this.currentSvenPosition.y -= 1;
          }
        }
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
}
