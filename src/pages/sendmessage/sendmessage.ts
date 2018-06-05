import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { User } from '../../user-model';


/**
 * Generated class for the SendmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendmessage',
  templateUrl: 'sendmessage.html',
})
export class SendmessagePage {

  headers:Headers;
  url:string;
  data: any = {};
  token:string;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","appId1" );
    // this.getUsers();

    this.storage.get("token").then((value)=>{
      this.token=value;
      // this.sendMessage();

    })
  }

  sendmessage(){

    this.url = "http://192.168.1.8:3030/app/sendMessage";
    this.http.post(this.url,{headers: this.headers}).map(res => res.json).subscribe(data=>{
      console.log(data);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendmessagePage');
  }

}
