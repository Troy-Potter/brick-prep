import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import * as L from "leaflet";
import { StoresService } from "../stores.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.css']
})
export class StoreLocatorComponent implements OnInit {
 
  map;
  store;
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: "leaflet/marker-icon.png",
      shadowUrl: "leaflet/marker-shadow.png"
  })};

  constructor(private storesService: StoresService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.map = L.map("map").setView([46.879966, -121.726909], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    this.map.invalidateSize()

    this.map.setView({lat: 43.1566, lng: -77.6088},10);

    this.displayStores()
  }

  displayStores(){
    this.storesService.getStores().subscribe((data) => {
      var stores = data['stores']

      for (let index = 0; index < 21; index++) {
        const store = stores[index];
        console.log(store);
        var long : number = store.longitude;
        var lat : number = store.latitude;

        var latlng = L.latLng({lat: lat, lng: long})
        var marker = L.marker(latlng, this.icon)
        marker.on('click', () =>{ 
          this.storesService.getStoreAddress(store).subscribe((location) =>{
            console.log("hello",location)
            var newStore = store
            newStore.address=location['address']
            this.store=newStore
          })
        })
        marker.addTo(this.map);
      }
      this.map.invalidateSize()

    })
  }


  dietPage(){
    this.router.navigate([`../diet/${this.store.number}`], {relativeTo: this.route})
  }

}
