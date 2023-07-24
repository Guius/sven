import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'snail';

  snailOrientation: string = './../assets/snail-forwards.png';

  lastSvenPosition: number = 1;
  currentSvenPosition: number = 1;

  ngOnInit() {
    /**
     * first block is gridColumnStart 1; last is gridColumnStart 5
     */
    setInterval(() => {
      // if sven is at the end of the row, go backwards
      if (this.currentSvenPosition === 12) {
        this.lastSvenPosition = this.currentSvenPosition;
        this.currentSvenPosition -= 1;
      } else if (this.currentSvenPosition === 1) {
        // if sven is at the start of the row, go forwards
        this.lastSvenPosition = this.currentSvenPosition;
        this.currentSvenPosition += 1;
      } else {
        // if he's not at the extremes, sven can choose
        if (this.getRandomZeroOrOne()) {
          // 1, so move forward
          this.lastSvenPosition = this.currentSvenPosition;
          this.currentSvenPosition += 1;
        } else {
          // 0, so move backward
          this.lastSvenPosition = this.currentSvenPosition;
          this.currentSvenPosition -= 1;
        }
      }

      // find out snail orientation
      if (this.lastSvenPosition > this.currentSvenPosition) {
        this.snailOrientation = './../assets/snail-backwards.png';
      } else {
        this.snailOrientation = './../assets/snail-forwards.png';
      }

      document.getElementById('snail-box')!.style.gridColumnStart =
        this.currentSvenPosition.toString();
    }, 1000);
  }

  getRandomZeroOrOne() {
    return Math.round(Math.random()); // Generates either 0 or 1 randomly
  }
}
