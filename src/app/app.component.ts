import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppConfig } from './app.config';
import { SplashPage } from '../pages/splash/splash';
import { Platform, NavController } from 'ionic-angular';
import { LoadingComponent } from '../components/loading/loading';
import { RestAPIService } from '../providers/rest-api-service';
import { TabsPage } from '../pages/tabs/tabs';
import { ConnectivityService } from '../providers/connectivity-service';

@Component({
  templateUrl: 'app.html'
})
export class GoPRExApp {

  @ViewChild('navCtrl') navCtrl: NavController;
  rootPage: any = SplashPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, appConfig: AppConfig,
    private restService: RestAPIService, private loading: LoadingComponent, private connectivity: ConnectivityService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.connectivity.isAvailable();
      statusBar.styleDefault();
      splashScreen.hide();
      this.preloadLoadData();
    }).catch((err) => {
      console.error(err);
    });
  }

  private preloadLoadData() {
    console.log("GoPRExApp preloadLoadData")

    this.restService.checkToken().subscribe((token) => {
      if (token) {
        this.navCtrl.setRoot(TabsPage);
        this.auth(true);
      } else {
        this.auth(false);
      }
    }, error => {
      this.auth(false);
    });
  }
  private auth(inBackground?: boolean) {
    if (!inBackground) {
      var loading = this.loading.showLoading("Authenticate...");
      this.restService.auth().subscribe((res) => {
        console.log("res :", res);
        loading.dismissAll();
        this.navCtrl.setRoot(TabsPage);
      }, err => {
        console.error(err);
        loading.dismissAll();
        this.navCtrl.setRoot(TabsPage);
      })
    } else {
      this.restService.auth().subscribe((res) => {
        console.log("res :", res);
      }, err => {
        console.error(err);
      })

    }

  }



}
