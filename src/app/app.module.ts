import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryListComponent } from './views/delivery-list/delivery-list.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppStore } from './store/app.store';
import { StoreModule } from '@ngrx/store';
import { deliveryReducer } from './store/delivery.reducer';
import { DeliveryEffects } from './store/delivery.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeliveryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot<AppStore>({ delivery: deliveryReducer }),
    EffectsModule.forRoot([DeliveryEffects]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
