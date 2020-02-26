import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import {StoresService} from './stores.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DietComponent } from './diet/diet.component';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    StoreLocatorComponent,
    DietComponent,
    SubscriptionComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatButtonModule, 
    MatRadioModule,
    MatCheckboxModule,
    MatGridListModule,
    FormsModule,
    LeafletModule.forRoot()
  ],
  providers: [StoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
