import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http'

import { HttpModule } from '@angular/http';
import { ListPage } from '../list/list';
import {JwtHelper} from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';


import 'rxjs/add/operator/map'
import { CreatePasswordPage } from '../create-password/create-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  user : User = {
    emailId:"ganeshn1994@outlook.com",
    password:"ganesh17"
  }

  url:string;
  headers:Headers;
  items : any;
  

  constructor(public plt: Platform, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public https: Http, public storage: Storage) {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin' , '*'); 
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

     let options = new RequestOptions({ headers:this.headers});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){ 

    if(!(this.user.emailId && this.user.password)){
      this.alertCtrl
      .create({title: "Error", message: "Check name and email.Please try again", buttons: ['OK']})
      .present();
      return;
    }
    // this.url = "http://192.168.1.13:3030/user?name="+this.user.name+"&email="+this.user.email;
    this.url = "http://ec2-34-238-38-204.compute-1.amazonaws.com:3030/app/login";


    this.https.post(this.url, {emailId: this.user.emailId, password: this.user.password },{headers: this.headers}).map(res => res.json()).subscribe (data => {
      // console.log(data);
      let token = data.token;
      let message = data.message;
      console.log(message);
     if(data.token != undefined){
       
     this.storage.set("token", token).then(()=>{
     this.navCtrl.setRoot(ListPage);
     })
      
     }else if(data.message == "Please Create Password"){
      
      this.navCtrl.push(CreatePasswordPage);
       
     }else{
      err => {
        console.log(err);
     }
    
    }

    })

  }
}
