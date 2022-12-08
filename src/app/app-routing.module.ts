import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { WarehouseRequestComponent } from './components/warehouse-request/warehouse-request.component';
import { DeliveryChallanListComponent } from './delivery-order-list/delivery-challan-list/delivery-challan-list.component';
import { DeliveryOrderListComponent } from './delivery-order-list/delivery-order-list.component';
import { DOLFilterComponent } from './delivery-order-list/dol-filter/dol-filter.component';
import { HomeComponent } from './home/home.component';
import { LtDetailsComponent } from './lt-details/lt-details.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  children: [{
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }]
},
  {
  path: 'Warehouse',
  component: WarehouseRequestComponent
},
  {
  path: 'landing',
  component: LandingComponent
},
  {
  path: 'ltDetails',
  component: LtDetailsComponent
},
  {
  path: 'deliveryOrderList',
  component: DeliveryOrderListComponent
},
  {
  path: 'deliveryChallanList',
  component: DeliveryChallanListComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
