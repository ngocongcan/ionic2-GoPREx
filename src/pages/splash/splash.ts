import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';
import { RestAPIService } from '../../providers/rest-api-service';
import { LoadingComponent } from '../../components/loading/loading';
import { Observable, Observer } from 'rxjs/Rx';

@Component({
  selector: 'splash-page',
  templateUrl: 'splash.html'

})
export class SplashPage {

  constructor(public navCtrl: NavController, private platform: Platform, private restService: RestAPIService, 
    private loading : LoadingComponent) {
        //this.requestAllData()
  }

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


}
