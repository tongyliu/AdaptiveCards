import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AdaptiveCardComponent } from './app.component'; 

@NgModule({ 
  imports: [BrowserModule], 
  declarations: [AdaptiveCardComponent], 
  bootstrap: [AdaptiveCardComponent] 
}) 

export class AdaptiveCardModule{}; 