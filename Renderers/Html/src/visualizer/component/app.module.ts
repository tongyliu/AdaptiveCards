import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AdaptiveCardComponent } from './app.component'; 
import { CardRendererComponent } from './card-renderer.component';
import { CardHeaderComponent } from './card-header.component';

@NgModule({ 
  imports: [BrowserModule], 
  declarations: [AdaptiveCardComponent, CardRendererComponent, CardHeaderComponent], 
  bootstrap: [AdaptiveCardComponent] 
}) 

export class AdaptiveCardModule{}; 