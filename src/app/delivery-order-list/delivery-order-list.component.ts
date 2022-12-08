import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddWarehouseRequestComponent } from '../add-warehouse-request/add-warehouse-request.component';
import { LtDetailsComponent } from '../lt-details/lt-details.component';
import { APIService } from '../services/api.service';
import { SortModelComponent } from '../sort-model/sort-model.component';
import { AddEditDeliveryChallanComponent } from './add-edit-delivery-challan/add-edit-delivery-challan.component';
import { DeliveryChallanListComponent } from './delivery-challan-list/delivery-challan-list.component';
import { DOLFilterComponent } from './dol-filter/dol-filter.component';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './delivery-order-list.component.html',
  styleUrls: ['./delivery-order-list.component.css']
})
export class DeliveryOrderListComponent implements OnInit {

  public segment: string = "list";
  public arr = new Array(25);
  message: any;
  loginUserId: any;
  loginUserName: any;
  deliveryOrderLists: any;
  statusValue = ['o'];
  constructor(private apiService: APIService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  ngOnInit(): void { 
    let user:any = localStorage.getItem('ergos-user');
    let accessToken = '';
    if(user) {
        user = JSON.parse(user);
        accessToken = user.userId;
    }
    this.loginUserId = accessToken;
    this.DeliveryOrderList();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    if(this.segment == 'list'){
      this.statusValue = ['o'];
    }else{
      this.statusValue = ['h'];
    }
    this.DeliveryOrderList();
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
      this.message = `Hello, ${data}!`;
      console.log(this.message);
    }
    modal.onDidDismiss().then(data => {
      console.log(data)
    })
  }

  filterDetails: any = {};
  async filterModal() {
    const modal = await this.modalCtrl.create({
      component: DOLFilterComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
      console.log(this.message);
    }
    modal.onDidDismiss().then(data => {
      console.log(data);
      this.filterDetails = data;
      this.onFilterList();
    });
  }

  async LtDetailsModal() {
    const modal = await this.modalCtrl.create({
      component: DeliveryChallanListComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
  async addWareHouseModal() {
    const modal = await this.modalCtrl.create({
      component: AddWarehouseRequestComponent,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
  showNoDataFound = false;
  DeliveryOrderList(){
    const payload ={
        "userId": this.loginUserId,
        "productId": null,
        "warehouseId": null,
        "salesOrderNumber": null,
        "deliveryOrderNumber": null,
        "stockReleaseId": null,
        "startDate": null,
        "endDate": null,
        "langId": 1,
        "sortBy": "asc",
        "status": this.statusValue,
        "pageNo": 1,
        "pageSize":10000
    }
    this.apiService.getDeliveryOrderList(payload).subscribe(async (result: any) =>{
      if(result.message == 'SUCCESS'){
        const loading = await this.loadingCtrl.create({
          message: 'Loading...',
          duration: 3000,
          cssClass: 'custom-loading',
        });
        loading.present();
      }
      console.log(result.status);
      this.deliveryOrderLists = result['deliveryOrderLists'];
      if(this.deliveryOrderLists.length == 0){
        this.showNoDataFound = true;
      }
    });
  }
  
  onFilterList(){
    const payload = {
      userId: this.loginUserId,
      productId: this.filterDetails.data.productId,
      warehouseId: this.filterDetails.data.warehouseId,
      salesOrderNumber: this.filterDetails.data.salesOrderNumber,
      deliveryOrderNumber: this.filterDetails.data.deliveryOrderNumber,
      startDate: this.filterDetails.data.startDate,
      endDate: this.filterDetails.data.endDate,
      langId: 1,
      sortBy: "asc",
      status: this.statusValue,
      local_status: this.filterDetails.data.local_status,
      pageNo: 1,
      pageSize:10000
      };
      this.apiService.getDeliveryOrderList(payload).subscribe(async (result: any) =>{
        if(result.message == 'SUCCESS'){
          const loading = await this.loadingCtrl.create({
            message: 'Loading...',
            duration: 3000,
            cssClass: 'custom-loading',
          });
          loading.present();
        }
        console.log(result.status);
        this.deliveryOrderLists = result['deliveryOrderLists'];
        if(this.deliveryOrderLists.length == 0){
          this.showNoDataFound = true;
        }
      });
  }
}
