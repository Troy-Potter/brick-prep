import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) {

   }

   


   getDiet(meal, diet){
    var url = `http://localhost:3001/diet/${meal}/${diet}`
   
    return this.http.get(url);
   }

   getRecipe(id){
    var url = `http://localhost:3001/recipe/${id}`
   
    return this.http.get(url);
   }


   getStores(){
     var url = "https://api.wegmans.io/stores?Subscription-Key=cfff018992be453fa5acebe1cb59594b&api-version=2018-10-18"
   
     return this.http.get(url);
   
    }

    getStoreAddress(store){
      var url = `https://api.wegmans.io/stores/${store.number}?Subscription-Key=cfff018992be453fa5acebe1cb59594b&api-version=2018-10-18`

      return this.http.get(url);

    }
}
