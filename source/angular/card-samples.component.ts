import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { HostAppService, Sample } from './app.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'card-samples',
  template: `
   <div class="cardSampleSelector">
        <span >Select a sample:</span>
         <select [(ngModel)]="selectedSample" (change)="onSelectSample($event)">
            <option *ngFor="let sample of (samples | async)" [ngValue]="sample.file">{{sample.name}}</option>
        </select>
    </div>`,
})
export class CardSampleComponent implements OnInit{
    selectedSample: string;
    samples:Promise<Sample[]>;

    @Output() selectedSampleFile = new EventEmitter<string>();

    constructor(private host:HostAppService,
                private http: Http){}

     ngOnInit() {
         this.samples = this.host.getSamples();
     }

     onSelectSample(selectedSampleName:Event)
     {
         console.log(this.selectedSample);
         this.http.get(this.selectedSample).toPromise()
         .then(response => {
            this.selectedSampleFile.emit(response.text());
         })
         .catch(err => {
             console.log(err);
         });
     }
}