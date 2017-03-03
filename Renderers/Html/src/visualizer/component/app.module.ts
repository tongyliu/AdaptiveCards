import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AdaptiveCardComponent } from './app.component'; 
import { CardRendererComponent } from './card-renderer.component';

@NgModule({ 
  imports: [BrowserModule], 
  declarations: [AdaptiveCardComponent, CardRendererComponent], 
  bootstrap: [AdaptiveCardComponent] 
}) 

export class AdaptiveCardModule{}; 