import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HostApp} from '../App';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html'
})
export class AdaptiveCardComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    console.log("Master component");
    let starter = new HostApp();
    starter.initialize();
  }
}
