import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WarehouseRequestComponent } from './components/warehouse-request/warehouse-request.component';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgZorroAntdModule } from '@eg-shared/material/ng-zorro-antd.module';
import { MaterialModule } from '@eg-shared/material/material.module';
import { IonicModule } from '@ionic/angular';
import { LandingComponent } from './components/landing/landing.component';
import { SortModelComponent } from './sort-model/sort-model.component';
import { FilterModelComponent } from './filter-model/filter-model.component';
import { LtDetailsComponent } from './lt-details/lt-details.component';
import { AddWarehouseRequestComponent } from './add-warehouse-request/add-warehouse-request.component';
import { DeliveryOrderListComponent } from './delivery-order-list/delivery-order-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DOLFilterComponent } from './delivery-order-list/dol-filter/dol-filter.component';
import { DeliveryChallanListComponent } from './delivery-order-list/delivery-challan-list/delivery-challan-list.component';
import { Ng2MultiSelectModule } from 'ng2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddEditDeliveryChallanComponent } from './delivery-order-list/add-edit-delivery-challan/add-edit-delivery-challan.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AddDcComponent } from './delivery-order-list/add-dc/add-dc.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    WarehouseRequestComponent,
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    SortModelComponent,
    FilterModelComponent,
    LtDetailsComponent,
    AddWarehouseRequestComponent,
    DeliveryOrderListComponent,
    DOLFilterComponent,
    DeliveryChallanListComponent,
    AddEditDeliveryChallanComponent,
    AddDcComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    MaterialModule,
    IonicModule.forRoot(),
    IonicModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
