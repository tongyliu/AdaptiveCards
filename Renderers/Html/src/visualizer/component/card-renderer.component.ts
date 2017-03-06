import {Component, OnInit, AfterViewInit, 
        Input, Output, EventEmitter,
        ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {HostApp} from '../App';

@Component({
  selector: 'card-renderer',
  templateUrl: './component/card-renderer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardRendererComponent implements AfterViewInit {
    @Input('schema-model') schemaObj: JSON;
    @Output('execute-action') execute = new EventEmitter<string>();

    constructor(private host:HostApp) {}

    ngAfterViewInit() {
    }

    renderCard(schema: JSON)
    {
        this.schemaObj = schema;
        this.host.renderCardHelper(JSON.stringify(this.schemaObj));
    }
}