import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  lat = 0;
  lon  = 0;
  constructor() {
    console.log(this.lat);
    console.log(this.lon);
   }

  ngOnInit(): void {
    this.getLocation();
  
  }

  //function that gets the location and returns it
getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.showPosition);
    
  } else {
    console.log("Geo Location not supported by browser");
  }
}
//function that retrieves the position
showPosition(position: any) { 
  console.log(position);
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
      console.log(longitude)
      console.log(latitude)
}
}
