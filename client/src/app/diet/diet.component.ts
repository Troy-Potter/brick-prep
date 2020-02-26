import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {

  storeNum;
  diet;
  nuts;
  soy;
  shellfish;
  diets = ['Omnivore','Vegan']

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.storeNum = this.route.snapshot.params['store'];
    console.log(this.storeNum);

  }

  isValid(){
    return !(this.storeNum && this.diet)
  }

  subscriptionPage(){

    var allergies = [] 

    if(this.nuts){
      allergies.push("nuts")
    }
    
    if(this.soy){
      allergies.push("soy")
    }
    
    if(this.shellfish){
      allergies.push("shellfish")
    }

    this.router.navigate([`../subscription/${this.storeNum}/${this.diet}/[${allergies}]`])
  }

}
