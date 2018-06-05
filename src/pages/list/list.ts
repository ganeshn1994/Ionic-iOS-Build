import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { ViewMessagePage } from '../view-message/view-message';
import { SendmessagePage } from '../sendmessage/sendmessage';
import { SlicePipe } from '@angular/common';


/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {


  headers:Headers;
  url:string;
  data: any = {};
  token:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public storage: Storage, public menuCtrl: MenuController) {

    this.headers = new Headers();

    this.headers.append('Access-Control-Allow-Origin' , '*'); 
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // this.getUsers();

    this.storage.get("token").then((value)=>{
      this.token=value;
      this.getUsers();

    });
    

    // to check if we have permission
// this.push.hasPermission()
// .then((res: any) => {

//   if (res.isEnabled) {
//     console.log('We have permission to send push notifications');
//     this.initPush();
//   } else {
//     console.log('We do not have permission to send push notifications');
//   }

//     });

        }

  // initPush(){
  //   const options: PushOptions = {
  //     android: {},
  //     ios: {
  //         alert: 'true',
  //         badge: true,
  //         sound: 'false'
  //     },
  //     windows: {},
  //     browser: {
  //         pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  //     }
  //  };
  //  const pushObject: PushObject = this.push.init(options);

  //  pushObject.on('notification').subscribe((notification: any) => 
  //  {
  //    //add the handlers
  //    let alert = this.alertCtrl.create({
  //     title: 'New notification',
  //     message: notification.message,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'See',
  //         handler: () => {
  //           console.log('Buy clicked');
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  //  });

  //  pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

  //  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  // }      
  openMenu() {
    this.menuCtrl.open();
  }
  closeMenu() {
    this.menuCtrl.close();
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  
  // showAddDialog(){
  //   this.alertCtrl.create({
  //     title: "Add Friend",
  //     message: "Enter the information of new member",
  //     inputs:[{
  //       name: 'name',
  //       placeholder: 'Enter the name'
  //     },{
  //       name: 'email',
  //       placeholder: 'Enter the email'
  //     },{
  //       name: 'phone',
  //       placeholder: 'Enter the phone'
  //     }],
  //     buttons:[
  //       {
  //         text: "Cancel"
  //       },{
  //         text:"Save",
  //         handler: data =>{

  //           this.url = "http://192.168.1.13:3030/user/useradd"
  //           this.http.post(this.url, {name: data.name, email: data.email, phone: data.phone, imageUrl: "http://lorempixel.com/32/32"}, {headers: this.headers}).map(res => res.json()).subscribe(res => {
  //             console.log(res);
  //             this.alertCtrl.create({
  //               title: "Success",
  //               message: "Added User"
  //             })
  //           }, err =>{
  //             console.log(err);
  //             this.alertCtrl.create({
  //               title: "Fail",
  //               // message: err.text(),
  //               buttons: [{
  //                 text:"OK"
  //               }]

  //             })
  //           })

  //         }
  //       }
  //     ]
  //   }).present();

  // }
  getUsers(){
    this.url = "http://ec2-34-238-38-204.compute-1.amazonaws.com:3030/app/jobsInProgress?token="+this.token;
    console.log(this.url);
    this.http.get(this.url, {headers:this.headers}).map(res => res.json()).subscribe(data =>{
      // console.log(res);
      this.data = data;
     let Folder = this.data.clientJobs;
     for(let i=0; i < Folder.length; i++){
        let Job = Folder[i].jobDetails
        

        // console.log(Categories);

     }
     


      
      console.log(Folder);
        

    }),err => {
      console.log(err);
    }
      
  }

  viewMessage(){
    // this.storage.set("token", this.token).then(()=>{
    this.navCtrl.push(ViewMessagePage);
    // });
  }
  sendMessage(){
    this.navCtrl.push(SendmessagePage);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ListPage');
  // }

}
