import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	constructor(private _http: HttpClient) {
		//this.getPotatoes();
	}
	
	getPotatoes(){
		return this._http.get('/potatoes');
	}
	getThisPotato(PID){
		return this._http.get('potatoes/'+PID);
	}

	addPotato(newPotato){
		console.log("hitting service addPotato with",newPotato);
		return this._http.post('/potatoes/', newPotato, {responseType: 'text'})
	}
	deletePotato(potatoID){
		console.log('delete route ', '/potatoes/'+potatoID);
		return this._http.delete('/potatoes/'+potatoID+'/');
	}
	updatePotato(potatoID, update_data){
		console.log('update route');
		return this._http.put('/potatoes/'+potatoID, update_data);
	}
	createComment(potatoID, newComment){
		console.log("comment create");
		return this._http.post('/potatoes/'+potatoID+"/comments", newComment, {responseType: 'text'})
	}
	getFarmersTaytos(farmer_name){
		console.log(farmer_name, " hello")
		return this._http.get('/farmers/'+farmer_name);
	}

}

