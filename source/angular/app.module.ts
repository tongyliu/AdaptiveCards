import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AdaptiveCardComponent } from './app.component'; 
import { CardRendererComponent } from './card-renderer.component';
import { CardHeaderComponent } from './card-header.component';
import { CardEditorComponent } from './card-editor.component';
import { CardSampleComponent } from './card-samples.component';

@NgModule({ 
  imports: [BrowserModule, HttpModule, FormsModule], 
  declarations: [AdaptiveCardComponent, CardRendererComponent, CardHeaderComponent, CardEditorComponent, CardSampleComponent], 
  bootstrap: [AdaptiveCardComponent]
}) 

export class AdaptiveCardModule{}; 