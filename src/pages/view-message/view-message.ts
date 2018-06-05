import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ViewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-message',
  templateUrl: 'view-message.html',
})
export class ViewMessagePage {

  headers:Headers;
  url:string;
  data: any = {};
  token:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin' , '*'); 
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    // this.getUsers();

    this.storage.get("token").then((value)=>{
      this.token=value;
      this.getMessages();

    })
  }

  getMessages(){
    this.url = "http://ec2-34-238-38-204.compute-1.amazonaws.com:3030/app/viewMessages?token="+this.token;
    console.log(this.url);
    this.http.get(this.url, {headers:this.headers}).map(res => res.json()).subscribe(data =>{
      // console.log(res);
      this.data = data;
      console.log("test" +data);
    }),err => {
      console.log(err);
    }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMessagePage');
  }

}
