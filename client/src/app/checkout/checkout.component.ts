import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from '../stores.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  days;
  meals;
  alcohol;
  storeNum;
  diet;
  allergens;
  type;
  address;
  food = [];
  numArray: Array<any> = [];
  pairings = [];
  pairing;

  constructor(private route: ActivatedRoute, private router: Router, private storeService: StoresService, private changeRef: ChangeDetectorRef, private http: HttpClient) { 
  }

  async ngOnInit() {
    this.storeNum = this.route.snapshot.params['store'];
    this.diet = this.route.snapshot.params['diet'];
    this.allergens = this.route.snapshot.params['allergens'];
    this.alcohol = this.route.snapshot.params['alcohol'];
    console.log("Days",this.days)
    this.meals = this.route.snapshot.params['meals'];
    this.type = this.route.snapshot.params['type'];
    this.days = this.route.snapshot.params['days']


    this.getAddress({number: this.storeNum});
    this.getLunches(this.diet);
  }

  getLunches(diet){
    this.storeService.getDiet('lunch',diet).subscribe((data) => {
      var lunches = data[0]['Lunch'];

      for (let index = 0; index < this.days; index++) {
        this.storeService.getRecipe(lunches[index]).subscribe((data) => {
          console.log(data)
          this.food.push(data)
          this.pairings.push(data['Pairing'])
          if(index == this.days-1){
            this.getDinners(this.diet);
          }

        })
      }
    })
  }

  getDinners(diet){
    this.storeService.getDiet('dinner',diet).subscribe((data) => {
      console.log(data)
      var dinners = data[0]['Dinner'];

      if(this.meals == 2){
        for (let index = 0; index < this.days; index++) {
          this.storeService.getRecipe(dinners[index]).subscribe((data) => {
            console.log(index,data)
            this.food.push(data)
            this.pairings.push(data['Pairing'])
            if(index==this.days-1 && this.alcohol=="true"){
              console.log("GOT SQUARE");
              this.calculateVelocity();
            }
          }) 
        }
      }else if(this.alcohol=="true"){
        console.log("GOT HERE")
        this.calculateVelocity()
      }

    })
  }

  calculateVelocity(){
    var parVar = {}
      var lowest = this.pairings[0]
      var lowestVel = 9999999999;
      for (let index = 0; index < this.pairings.length; index++) {
        const element = this.pairings[index];
        if(parVar[element] == 1){

        }else{
          parVar[element.sku] = 1;
          var url =  `https://api.wegmans.io/products/${element}/availabilities/${this.storeNum}?api-version=2018-10-18&Subscription-Key=d6cdec8e3c66405a830ba90e8a6f321a`
          this.http.get(url).subscribe((data) => {
            console.log('beer',data)
  
            if(data['velocity']){
              if(data['velocity'] < lowestVel){
                lowest = element
                lowestVel = data['velocity']
              }
            }
  
            if(index == this.pairings.length-1){
              var url =  `https://api.wegmans.io/products/${lowest}?api-version=2018-10-18&Subscription-Key=d6cdec8e3c66405a830ba90e8a6f321a`
              this.http.get(url).subscribe((data) => {
            
                var pairing = data;
                console.log('beer',data)
  
                pairing['Pic'] = data['tradeIdentifiers'][0]['images'][0];
                pairing['Name'] = data['name']
    
                this.food.push(pairing);
                this.changeRef.detectChanges(); 
  
              })
            }
  
  
          })
        }
      }
  }

  getAddress(store){
    this.storeService.getStoreAddress(store).subscribe((data) => {
      this.address = data['address'];
    })
  }


  arrayOne(n: number): any[] {
    return Array(n);
  }


}
