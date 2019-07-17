import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PotatoComponent } from './potato/potato.component';

@NgModule({
  declarations: [
	AppComponent,
	PotatoComponent,
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
