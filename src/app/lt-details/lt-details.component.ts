import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lt-details',
  templateUrl: './lt-details.component.html',
  styleUrls: ['./lt-details.component.css']
})
export class LtDetailsComponent implements OnInit {

  EndDate: any;
  StartDate: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalCtrl.dismiss();
}

}
