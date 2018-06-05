import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { User } from '../../user-model';
import 'rxjs/add/operator/map'



/**
 * Generated class for the CreatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html',
})
export class CreatePasswordPage {

  user : User = {
    emailId:"ganeshn1994@outlook.com",
    password:"ganesh17"
  }

  headers:Headers;
  url:string;
  token:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, public storage: Storage) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id","appId1" );
    // this.getUsers();

    this.storage.get("token").then((value)=>{
      this.token=value;
      this.createpassword();

    })
  }

  createpassword(){
    this.url = "http://192.168.1.10:3030/app/createPassword";
    this.http.post(this.url,{password: this.user.password},{headers: this.headers}).map(res => res.json()).subscribe (res =>{
      console.log("success" + res);
      this.navCtrl.push(LoginPage);
      
    })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePasswordPage');
  }

}
