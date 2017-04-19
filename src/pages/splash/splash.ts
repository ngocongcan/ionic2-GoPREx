import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'splash-page',
  templateUrl: 'splash.html'

})
export class SplashPage {

  constructor(public navCtrl: NavController) {
        //this.requestAllData()
  }

/*
  private requestAllData() {
    console.log("SplashPage requestAllData")
     this.platform.ready().then(() => {
          this.loading.showLoading("Loading...");
          this.restService.requestAllData().subscribe((res) => {
            console.log("res :", res);
            this.loading.hideLoading();
             this.navCtrl.setRoot(TabsPage);
          }, err => {
            console.error(err);
            this.loading.hideLoading();
            this.navCtrl.setRoot(TabsPage);
          })
         
        }).catch((err) => {
          this.loading.hideLoading();
          console.log(err);
      });
  }
  */


}
