import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { AddDcComponent } from '../add-dc/add-dc.component';
import { AddEditDeliveryChallanComponent } from '../add-edit-delivery-challan/add-edit-delivery-challan.component';

@Component({
  selector: 'app-delivery-challan-list',
  templateUrl: './delivery-challan-list.component.html',
  styleUrls: ['./delivery-challan-list.component.css']
})
export class DeliveryChallanListComponent implements OnInit {

  EndDate: any;
  StartDate: any;
  ROID:any;
  constructor(private modalCtrl: ModalController,private apiService: APIService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.ROID = params.ROID;
     });
     this.getChallanList();
  }
  closeModal() {
    this.modalCtrl.dismiss();
}
async AddEditDeliveryChallan(DOId:any, CDId: any) {
  const modal = await this.modalCtrl.create({
    component: AddEditDeliveryChallanComponent,
    cssClass: 'custom-modal',
    componentProps: { ID: DOId, CDId: CDId }
  });
  await modal.present();
  
}
  async AddDeliveryChallan(){
  const modal = await this.modalCtrl.create({
    component: AddDcComponent,
    cssClass: 'custom-modal',
    componentProps: {ID: this.deliveryOrderId }
  });
  await modal.present();
  
}
dcList: any = [];
deliveryOrderId: any;
getChallanList(){
  const payload = {
    deliveryOrderId: this.ROID,
    langId: 1
  }
  this.apiService.getDeliveryChallanList(payload).subscribe((result: any)=>{
    this.dcList = result.dcList;
    this.deliveryOrderId = this.dcList[0]['deliveryOrderId'];
  });
}

}
