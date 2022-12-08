import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dol-filter',
  templateUrl: './dol-filter.component.html',
  styleUrls: ['./dol-filter.component.css']
})
export class DOLFilterComponent implements OnInit {

  EndDate: any;
  StartDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  selectedItemsWarehouse: any = [];
  dropdownSettings = {};
  dropdownSettingsWarehouse = {};
  products: any = [];
  warehouses: any = [];
  FilterForm:any = FormGroup;
  constructor(private modalCtrl: ModalController, private apiService: APIService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.FilterForm = this.fb.group({
      product: [''],
      warehouse: [''],
      sono: ['',],
      dono: [''],
      status: [''],
      startDate: [''],
      endDate: ['']
    })
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; 
    this.dropdownSettingsWarehouse = {
      singleSelection: true,
      idField: 'id',
      textField: 'swarehouseName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getProducts();
    this.getWareHouse();
  }
  closeModal() {
    this.modalCtrl.dismiss();
}
onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}
onItemSelectWarehouse(item: any) {
  console.log(item);
}
onSelectAllWarehouse(items: any) {
  console.log(items);
}

getProducts() {
  this.apiService.getProducts().subscribe((result: any) => {
    const productList = result.data
    this.products = productList.product ? productList.product : {};
  }, (error) => {
    this.products = [];
  });
}

getWareHouse() {
    const payloads = {}
    this.apiService.getWarehouse(payloads).subscribe((result: any) => {
    this.warehouses = result.erWarehouseOnboardingList ? result.erWarehouseOnboardingList : [];
  }, (error) => {
    this.warehouses = [];
    console.log(error);
  });
}
WV:any;
confirm() {
  try {
  const warehouse = this.FilterForm.controls.warehouse.value;
  this.WV = warehouse[0].id;
  }
  catch(Exception) {
  }
  const payload = {
    productId: this.FilterForm.controls.product.value,
    warehouseId: this.WV,
    salesOrderNumber: this.FilterForm.controls.sono.value,
    deliveryOrderNumber: this.FilterForm.controls.dono.value,
    startDate: this.FilterForm.controls.startDate.value,
    endDate: this.FilterForm.controls.endDate.value,
    local_status: this.FilterForm.controls.status.value
};
  return this.modalCtrl.dismiss(payload, 'confirm');
}
}
