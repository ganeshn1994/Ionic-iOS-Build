import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { ListPage } from '../pages/list/list';
import  { SendmessagePage } from '../pages/sendmessage/sendmessage';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  token:string;
  
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    this.storage.get("token").then((value)=>{
      this.token=value;
      this.logout();

    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'List', component: ListPage },

      
    ];
  }
  logout(){
    this.storage.remove("token").then(()=>{
      this.nav.setRoot(LoginPage);
    })

  }  
}

