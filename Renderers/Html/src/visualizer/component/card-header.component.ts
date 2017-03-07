import {Component, OnInit, AfterViewInit, 
        Input, Output, EventEmitter, OnDestroy,
        ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {HostApp} from '../App';
import {DataTransferService} from './DataTransferService';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'card-header',
  templateUrl: './component/card-header.html'
})
export class CardHeaderComponent implements AfterViewInit, OnDestroy {

    constructor(){}

    ngAfterViewInit() {
        
    }

    ngOnDestroy(){

    }
}