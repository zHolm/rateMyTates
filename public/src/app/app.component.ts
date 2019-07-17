import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	constructor(private _httpService: HttpService){}
  	title = 'Rate My Tates';
	potatoes = [];
	potato: any;
	newPotato: any;
	newComment: any;
	comments = [];
	farmer: String;

	ngOnInit(){
		this.getTaytoService();
		this.newPotato= {"title": "", "farmer": "", "url": ""};
		this.newComment = {"rating": 0 , "comment_body": ""}
	}
	filterFarmer(){
		console.log("yyyyyyyy", this.farmer)
		let obs = this._httpService.getFarmersTaytos(this.farmer);
		obs.subscribe(farmD=>{
			console.log(farmD, " farmD");
			this.potatoes = farmD['potatoes'];
			console.log("arrya", this.potatoes)
		})
	}

	getTaytoService(){
		let obs = this._httpService.getPotatoes();
		obs.subscribe(potato_data=>{
			console.log(potato_data['data'])
			this.potatoes = potato_data['data'];
		})
	}
	getThatTayto(pid: String){
		console.log("This potato ID is: ", pid)
		let obs =this._httpService.getThisPotato(pid);
		obs.subscribe(pdata=>{
			this.potato = pdata['data'][0];
			console.log("found this potatoe object: ", this.potato)
			this.comments = this.potato.comments;
		})

	}
	addPotato(){
		let obs = this._httpService.addPotato(this.newPotato);
		obs.subscribe(data=>{
			console.log("subscribe submit", data)
			this.newPotato = {"title": "", "farmer" : "", "url": ""}
			this.getTaytoService();
		})
		
	}
	addComment(PID: String){
		let obs = this._httpService.createComment(PID, this.newComment);
		obs.subscribe(data=>{
			console.log("comment subscribe");
			this.newComment = {"rating": 0, "comment_body": ""};
			this.getThatTayto(PID);
		})
	}

}
