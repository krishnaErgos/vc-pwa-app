import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

import { ModalController } from '@ionic/angular';
import { SortModelComponent } from 'src/app/sort-model/sort-model.component';
import { FilterModelComponent } from 'src/app/filter-model/filter-model.component';
import { LtDetailsComponent } from 'src/app/lt-details/lt-details.component';
import { AddWarehouseRequestComponent } from 'src/app/add-warehouse-request/add-warehouse-request.component';

@Component({
  selector: 'app-warehouse-request',
  templateUrl: './warehouse-request.component.html',
  styleUrls: ['./warehouse-request.component.css']
})
export class WarehouseRequestComponent implements OnInit {
  public segment: string = "list";
  public arr = new Array(25);

  message: any;
  
  constructor(private apiService: APIService,
    private modalCtrl: ModalController) {}
  
  ngOnInit(): void {}
 
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SortModelComponent,
      breakpoints: [0, 0.3, 1],
      initialBreakpoint: 0.3,
      cssClass: 'custom-modal'
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = ` ${data}`;
      console.log(this.message)
    }
  }

  async filterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterModelComponent,
      // breakpoints: [0,  1],
      // initialBreakpoint: 1,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  async LtDetailsModal() {
    const modal = await this.modalCtrl.create({
      component: LtDetailsComponent,
      // breakpoints: [0,  1],
      // initialBreakpoint: 1,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
  async addWareHouseModal() {
    const modal = await this.modalCtrl.create({
      component: AddWarehouseRequestComponent,
      // breakpoints: [0,  1],
      // initialBreakpoint: 1,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
}
