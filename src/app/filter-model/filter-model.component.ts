import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-model',
  templateUrl: './filter-model.component.html',
  styleUrls: ['./filter-model.component.css']
})
export class FilterModelComponent implements OnInit {
  EndDate: any;
  StartDate: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalCtrl.dismiss();
}
}
