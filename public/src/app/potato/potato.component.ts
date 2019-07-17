import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.css']
})
export class PotatoComponent implements OnInit {
	@Input() getThatTayto: any;	
  	constructor() { }

  	ngOnInit() {
		console.log("TAYOOOO", this.getThatTayto);
  	}

}
