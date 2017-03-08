import {Component, OnInit, AfterViewInit, 
        Input, Output, EventEmitter, OnDestroy,
        ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'card-header',
  templateUrl: './card-header.html'
})
export class CardHeaderComponent implements AfterViewInit, OnDestroy {

    constructor(){}

    ngAfterViewInit() {
        
    }

    ngOnDestroy(){

    }
}