import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-warehouse-request',
  templateUrl: './add-warehouse-request.component.html',
  styleUrls: ['./add-warehouse-request.component.css']
})
export class AddWarehouseRequestComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalCtrl.dismiss();
}
}
