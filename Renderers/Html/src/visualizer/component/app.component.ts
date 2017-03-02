import {Component, ElementRef, ViewChild, Inject, OnInit, AfterViewInit} from '@angular/core';
import {URLSearchParams, RequestOptions, BaseRequestOptions} from '@angular/http';
import {HostApp} from '../App';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html'
})
export class AdaptiveCardComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log("Master component");
    let starter = new HostApp();
    starter.initialize();
  }
}
