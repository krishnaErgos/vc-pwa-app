import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sort-model',
  templateUrl: './sort-model.component.html',
  styleUrls: ['./sort-model.component.css']
})
export class SortModelComponent implements OnInit {
  name: any;
  val: any;
  payload: any ={
    name: '1'
  }
  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.payload, 'confirm');
  }

  ngOnInit(): void {
  }

}
