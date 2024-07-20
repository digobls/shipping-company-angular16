import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DeliveryListComponent } from './views/delivery-list/delivery-list.component';

// Obs: Como é algo simples foi aplicado da maneira abaixo, modo corretamente
// seria utilizando os principios de lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entregas', component: DeliveryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
