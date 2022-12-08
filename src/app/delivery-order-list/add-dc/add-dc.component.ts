import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-dc',
  templateUrl: './add-dc.component.html',
  styleUrls: ['./add-dc.component.css']
})

export class AddDcComponent implements OnInit {
  get f() { return this.VehicleWiseForm.controls; }
  challanDate: any;
  rstDate: any;
  VehicleWiseForm: any = FormGroup;
  BagWisePageOneForm: any = FormGroup;
  pageTwoform: any = FormGroup;
  VehicleWise = true;
  bagWise = false;
  WeightingMethod: any = 'Vehicle';
  pageOne = true;
  pageTwo = false;

  BagsCount: any;
  @Input() ID: any;
  @Input() CDId: any;
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder, private apiService: APIService, private toastController: ToastController) { }

  ngOnInit(): void {
    this.VehicleWiseForm = this.fb.group({
      weightingMethod: ['', [Validators.required]],
      // avrageWeight: ['', [Validators.required]],
      totalWeight: ['', [Validators.required]],
      tareWeight: ['', [Validators.required]],
      netWeight: ['', [Validators.required]],
      totalGrainValue: ['', [Validators.required]],
      // challanDate: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      driverName: [''],
      weighingBridgeName: [''],
      distanceToWeighing: [''],
      gatePassRemarks: [''],
      totalNoOfBags: ['', [Validators.required]],
      rstNo: ['', [Validators.required]],
      rstDate: ['', [Validators.required]],
      fileControl: new FormControl()
    });
    this.BagWisePageOneForm = this.fb.group({
      weightingMethod: ['', [Validators.required]],
      vehicleNumberPO: ['', [Validators.required]],
      driverName: ['',],
      gatePassRemarks: [''],
    })
    this.pageTwoform = this.fb.group({
      totalNumberOfBags: ['', [Validators.required]],
      totalGrainValuePT: ['', [Validators.required]],
      roles: this.fb.array([]),
    });
    this.addControlDefault();
    this.getChallanDetails();
    // this.viewChallanDetails();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  message: any;
  imagePath: any;
  url: any;
  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      console.log(reader.result);
      this.url = reader.result;
    }
  }

  gatePassImgFormData: any;
  uploadGatePassName: any;
  onFileChange(event: any) {
    this.gatePassImgFormData = event.files[0];
    console.log(this.gatePassImgFormData);
  }

  onWeighingChange(event: any) {
    if (event.detail.value == 'Bag') {
      this.bagWise = true;
      this.VehicleWise = false;
      this.WeightingMethod = 'Bag'
    } else {
      this.VehicleWise = true;
      this.bagWise = false;
      this.WeightingMethod = 'Vehicle'
    }
  }
  pageOneClick() {
    this.pageOne = false;
    this.pageTwo = true;
  }
  pageTwoClick() {
    this.pageOne = true;
    this.pageTwo = false;
  }

  get rolesFieldAsFormArray(): any {
    return this.pageTwoform.get('roles') as FormArray;
  }

  role(): any {
    return this.fb.group({
      role: this.fb.control(''),
    });
  }
  addControl(): void {
    (this.pageTwoform.controls['roles'] as FormArray).clear();
    console.log(this.rolesFieldAsFormArray);
    for (let i = 0; i < this.pageTwoform.controls.totalNumberOfBags.value; i++) {
      const control = this.pageTwoform.controls.roles as FormArray;
      const sonderurlaub = this.fb.group({
        role: ['', [Validators.required]],
      });
      control.push(sonderurlaub);
    }
  }
  addControlDefault(): void {
    this.rolesFieldAsFormArray.push(this.role());
  }

  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }


  challanDetails: any;
  challanId: any;
  salesOrderQuantity: any;
  deliveryOrderQuantity: any;
  availableStock: any;
  totalDcQuantity: any;

  getChallanDetails() {
    this.challanId = this.ID;
    this.apiService.getDeliveryChallanDetails(this.challanId).subscribe((result: any) => {
      this.challanDetails = result.dcList;
      console.log(this.challanDetails);
      this.salesOrderQuantity = this.challanDetails.salesOrderQuantity;
      this.deliveryOrderQuantity = this.challanDetails.deliveryOrderQuantity;
      this.availableStock = result.availableStock;
      this.totalDcQuantity = result.totalDcQuantity;
    });
  }
  viewDCValues: any;
  challanQuantity: any;
  totalGrainNetWeight: any;
  ImgUrl: any;
  viewChallanDetails() {
    this.apiService.viewDeliveryChallanDetails(this.CDId).subscribe((result: any) => {
      this.viewDCValues = result.presentScreenData;
      console.log(this.viewDCValues);
      if (this.viewDCValues.dcWeightingMethod === '1') {
        this.VehicleWise = true;
        this.bagWise = false;
        this.WeightingMethod = 'Vehicle';
        this.ImgUrl = 'data:image/jpeg;base64,' + this.viewDCValues.rstFile;
        this.url = this.ImgUrl;
        this.VehicleWiseForm.patchValue({
          totalWeight: this.viewDCValues.vehicleWiseDto.totalWeight,
          tareWeight: this.viewDCValues.vehicleWiseDto.tareWeight,
          netWeight: this.viewDCValues.vehicleWiseDto.netWeight,
          totalGrainValue: this.viewDCValues.vehicleWiseDto.totalGrainValue,
          challanDate: this.viewDCValues.vehicleWiseDto.challanDate,
          vehicleNumber: this.viewDCValues.vehicleWiseDto.vehicleNumber,
          driverName: this.viewDCValues.vehicleWiseDto.driverName,
          weighingBridgeName: this.viewDCValues.vehicleWiseDto.weighingBridgeName,
          distanceToWeighing: this.viewDCValues.vehicleWiseDto.distanceToWeight,
          gatePassRemarks: this.viewDCValues.vehicleWiseDto.gatePassRemarks,
          totalNoOfBags: this.viewDCValues.vehicleWiseDto.totalNoOfBags,
          rstNo: this.viewDCValues.vehicleWiseDto.rstNumber,
          rstDate: this.viewDCValues.vehicleWiseDto.rstDate,
        });
        this.challanDate = this.viewDCValues.vehicleWiseDto.challanDate;
        this.rstDate = this.viewDCValues.vehicleWiseDto.rstDate;
        this.challanQuantity = this.viewDCValues.vehicleWiseDto.netWeight;
      } else if (this.viewDCValues.dcWeightingMethod === '0') {
        this.bagWise = true;
        this.VehicleWise = false;
        this.WeightingMethod = 'Bag';
        this.BagWisePageOneForm.patchValue({
          gatePassRemarks: this.viewDCValues.dcBagWiseDto.gatePassRemarks,
          vehicleNumberPO: this.viewDCValues.dcBagWiseDto.vehicleNumber,
          driverName: this.viewDCValues.dcBagWiseDto.driverName
        });
        this.pageTwoform.patchValue({
          totalNumberOfBags: this.viewDCValues.dcBagDetailsDto.totalNoOfBags,
          totalGrainValuePT: this.viewDCValues.dcBagDetailsDto.totalGrainValue,
        });
        this.totalGrainNetWeight = this.viewDCValues.dcBagDetailsDto.totalGrainNetWeight;
        this.BagsCount = this.viewDCValues.dcBagDetailsDto.totalNoOfBags;
        for (let i = 0; i < this.viewDCValues.dcBagDetailsDto.bagWeight.length; i++) {
          const control = this.pageTwoform.controls.roles as FormArray;
          const sonderurlaub = this.fb.group({
            role: [this.viewDCValues.dcBagDetailsDto.bagWeight[i], [Validators.required]],
          });
          control.push(sonderurlaub);
        }
      }
    });

  }

  get errorControl() {
    return this.VehicleWiseForm.controls;
  }
  isSubmitted = false;
  ShowRSTSlipReq = false;
  submitForm() {
    this.isSubmitted = true;
    if (!this.VehicleWiseForm.valid) {
      console.log('Please provide all the required values!');
      this.scrollToError();
      return false;
    } else if(!this.gatePassImgFormData){
      this.ShowRSTSlipReq = true;
      this.scrollToError();
      return false;
    }else {
      
      // const pay = {
      //   "dcBagWiseDto": {
      //     "vehicleNumber": ""
      //   },
      //   "pinCode": "123456",
      //   "productName": "Paddy",
      //   "saleOrderQty": 0.6459999999999999,
      //   "stateId": 3,
      //   "vehicleWiseDto": {
      //     "netWeight": 0.0009999999999994458,
      //     "rstDate": "2022-11-25",
      //     "rstNumber": "578",
      //     "tareWeight": 12.9,
      //     "totalGrainValue": 122.4,
      //     "totalNoOfBags": 10,
      //     "totalWeight": 12.901,
      //     "vehicleNumber": "5790"
      //   },
      //   "warehouseId": "120"
      // }
      const payload = {
        screenTag: "wm",
        DeliveryChallanId: this.ID ? this.ID: null,
        saleOrderId: this.challanDetails.salesOrderId ? this.challanDetails.salesOrderId: null,
        releaseOrderId: this.challanDetails.releaseOrderMasterId ? this.challanDetails.releaseOrderMasterId: null,
        buyerId: this.challanDetails.buyerId ? this.challanDetails.buyerId: null,
        buyerName: this.challanDetails.buyerName ? this.challanDetails.buyerName: null,
        warehouseId: this.challanDetails.warehouseId ? this.challanDetails.warehouseId: null,
        productId: this.challanDetails.productId ? this.challanDetails.productId: null,
        // swsData: this.challanDetails.isSwsEnable ? this.challanDetails.isSwsEnable: null,
        dcWeightingMethod: "1",
        pinCode: this.challanDetails.pincode ? this.challanDetails.pincode: null,
        productName: this.challanDetails.productName ? this.challanDetails.productName: null,
        saleOrderQty: this.challanDetails.salesOrderQuantity ? this.challanDetails.salesOrderQuantity: null,
        stateId: this.challanDetails.stateId ? this.challanDetails.stateId: null,
        vehicleWiseDto: {
          totalWeight: this.VehicleWiseForm.controls.totalWeight.value ? this.VehicleWiseForm.controls.totalWeight.value: null,
          tareWeight: this.VehicleWiseForm.controls.tareWeight.value ? this.VehicleWiseForm.controls.tareWeight.value: null,
          netWeight: this.VehicleWiseForm.controls.netWeight.value ? this.VehicleWiseForm.controls.netWeight.value: null,
          totalGrainValue: this.VehicleWiseForm.controls.totalGrainValue.value ? this.VehicleWiseForm.controls.totalGrainValue.value: null,
          vehicleNumber: this.VehicleWiseForm.controls.vehicleNumber.value ? this.VehicleWiseForm.controls.vehicleNumber.value: null,
          driverName: this.VehicleWiseForm.controls.driverName.value ? this.VehicleWiseForm.controls.driverName.value: null,
          weighingBridgeName: this.VehicleWiseForm.controls.weighingBridgeName.value ? this.VehicleWiseForm.controls.weighingBridgeName.value: null,
          distanceToWeight: this.VehicleWiseForm.controls.distanceToWeighing.value ? this.VehicleWiseForm.controls.distanceToWeighing.value: null,
          gatePassRemarks: this.VehicleWiseForm.controls.gatePassRemarks.value ? this.VehicleWiseForm.controls.gatePassRemarks.value: null,
          totalNoOfBags: this.VehicleWiseForm.controls.totalNoOfBags.value ? this.VehicleWiseForm.controls.totalNoOfBags.value: null,
          rstNumber:  this.VehicleWiseForm.controls.rstNo.value ? this.VehicleWiseForm.controls.rstNo.value: null,
          rstDate:  this.VehicleWiseForm.controls.rstDate.value ? this.VehicleWiseForm.controls.rstDate.value: null
        }
      }
      console.log(this.VehicleWiseForm.value);
      this.apiService.saveDeliveryChallan(payload).subscribe((result: any) => {
        console.log(result);
      });
      const formData  = new FormData();
      formData.append('rstSlipFile' , this.gatePassImgFormData);
      const rstSlipObject: any = {
        deliveryChallanId: this.ID,
        rstDate: this.VehicleWiseForm.controls.rstDate.value,
        rstNumber: this.VehicleWiseForm.controls.rstNo.value
      }
      formData.append('rstSlipObject', JSON.stringify({
        deliveryChallanId: this.ID,
        rstDate: this.VehicleWiseForm.controls.rstDate.value,
        rstNumber: this.VehicleWiseForm.controls.rstNo.value
      }));
      console.log(formData);
      if(this.gatePassImgFormData != undefined){
      this.apiService.uploadRst(formData).subscribe((result:any) => {
        console.log(result);
      });
    }
    }
    return;
  }
  isSubmittedBWPageOne = false;
  bagValueFinal: any = [];
  submitFormBagWise() {
    this.isSubmittedBWPageOne = true;
    if (!this.BagWisePageOneForm.valid) {
      console.log('Please provide all the required values!');
      this.scrollToError();
      return false;
    } else {
      console.log(this.BagWisePageOneForm.value);
      this.pageOneClick();
      const bageNumberArray = Array.from(Array(this.pageTwoform.controls.totalNumberOfBags.value), (_, index) => index + 1);
      const roles = this.pageTwoform.controls.roles.value;
      this.bagValueFinal = [];
      for(let i = 0; i< roles.length; i++){
        this.bagValueFinal.push(roles[i].role);
      }
      const payload = {
        screenTag: "bd",
        DeliveryChallanId: this.ID,
        saleOrderId: this.challanDetails.salesOrderId ? this.challanDetails.salesOrderId: null,
        releaseOrderId: this.challanDetails.releaseOrderMasterId ? this.challanDetails.releaseOrderMasterId: null,
        buyerId: this.challanDetails.buyerId ? this.challanDetails.buyerId: null,
        buyerName: this.challanDetails.buyerName ? this.challanDetails.buyerName: null,
        warehouseId: this.challanDetails.warehouseId,
        productId: this.challanDetails.productId,
        swsData: this.challanDetails.isSwsEnable,
        // romBagPKId: this.viewDCValues.romBagPKId,
        dcWeightingMethod:"0",
        dcBagDetailsDto: {
          totalGrainValue:  this.pageTwoform.controls.totalGrainValuePT.value,
          totalGrainNetWeight: this.totalGrainNetWeight,
          totalNoOfBags: this.pageTwoform.controls.totalNumberOfBags.value,
          bagNumber: bageNumberArray,
          bagWeight: this.bagValueFinal,
          remarks: null
        }
      }
      console.log(payload);
      this.apiService.saveDeliveryChallan(payload).subscribe(async (result: any) => {
        console.log(result);
        if(result.message = "DELIVERY CHALLAN UPDATED SUCCESSFULLY"){
          const toast = await this.toastController.create({
            message: 'DELIVERY CHALLAN UPDATED SUCCESSFULLY',
            position: 'top',
            color: 'medium',
            duration: 3000,
            cssClass: 'custom-toast',
            buttons: [
              {
                text: 'Dismiss',
                role: 'cancel'
              }
            ],
          });
      
          await toast.present();
        }
      });
    }
    return;
  }

  isSubmittedBWPageTwo = false;
  formValue() {
    this.isSubmittedBWPageTwo = true;
    if (!this.pageTwoform.valid) {
      console.log('Please provide all the required values!');
      this.scrollToError();
      return false;
    } else {
      console.log(this.pageTwoform.value);
      const bageNumberArray = Array.from(Array(this.pageTwoform.controls.totalNumberOfBags.value), (_, index) => index + 1);
      const roles = this.pageTwoform.controls.roles.value;
      this.bagValueFinal = [];
      for(let i = 0; i< roles.length; i++){
        this.bagValueFinal.push(roles[i].role);
      }
      const payload = {
        screenTag: "bd",
        DeliveryChallanId: this.ID,
        saleOrderId: this.challanDetails.salesOrderId ? this.challanDetails.salesOrderId: null,
        releaseOrderId: this.challanDetails.releaseOrderMasterId ? this.challanDetails.releaseOrderMasterId: null,
        buyerId: this.challanDetails.buyerId ? this.challanDetails.buyerId: null,
        buyerName: this.challanDetails.buyerName ? this.challanDetails.buyerName: null,
        warehouseId: this.challanDetails.warehouseId,
        productId: this.challanDetails.productId,
        swsData: this.challanDetails.isSwsEnable,
        // romBagPKId: this.viewDCValues.romBagPKId,
        dcWeightingMethod:"0",
        dcBagDetailsDto: {
          totalGrainValue:  this.pageTwoform.controls.totalGrainValuePT.value,
          totalGrainNetWeight: this.totalGrainNetWeight,
          totalNoOfBags: this.pageTwoform.controls.totalNumberOfBags.value,
          bagNumber: bageNumberArray,
          bagWeight: this.bagValueFinal,
          remarks: null
        }
      }
      console.log(payload);
      this.apiService.saveDeliveryChallan(payload).subscribe(async (result: any) => {
        console.log(result);
        if(result.message = "DELIVERY CHALLAN UPDATED SUCCESSFULLY"){
          const toast = await this.toastController.create({
            message: 'DELIVERY CHALLAN UPDATED SUCCESSFULLY',
            position: 'top',
            color: 'medium',
            duration: 3000,
            cssClass: 'custom-toast',
            buttons: [
              {
                text: 'Dismiss',
                role: 'cancel'
              }
            ],
          });
      
          await toast.present();
        }
      });
    }
    return;
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError: any = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(firstElementWithError);
  }
}