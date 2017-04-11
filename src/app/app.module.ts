import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { IonicStorageModule } from '@ionic/storage';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// Classes
import { AppConfig } from './app.config';
// Configs
import { FirebaseConfig } from './firebase.config';
// Pages
import { AboutPage } from '../pages/about/about';
import { ChartsPage } from '../pages/charts/charts';
import { GoldPricePage } from '../pages/gold-price/gold-price';
import { RateExchangePage } from '../pages/rate-exchange/rate-exchange';
import { TabsPage } from '../pages/tabs/tabs';
// Shared Components
import { AlertComponent } from '../components/alert/alert';
import { LoadingComponent } from '../components/loading/loading';
// Components
import { ConnectionInstablePopupPage } from '../components/connection-instable-popup/connection-instable-popup';
import { HorizontalTabsComponent } from '../components/horizontal-tabs/horizontal-tabs';
// Providers
import { RestAPIService } from '../providers/rest-api-service';
// Classes
// Pipes


//---
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const Pages = [
  RateExchangePage,
  GoldPricePage,
  ChartsPage,
  AboutPage,
  TabsPage
]

const Components = [
  ConnectionInstablePopupPage,
  HorizontalTabsComponent
]
const SharedComponents = [
  AlertComponent,
  LoadingComponent
]
const Pipes = [

]

const Classes = [
  AppConfig
]
const Providers = [
  RestAPIService
]

@NgModule({
  declarations: [
    MyApp,
    ...Pages,
    ...Components,
    ...SharedComponents,
    ...Pipes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({ name: '__goPRexDB', }),
    AngularFireModule.initializeApp(FirebaseConfig, {
      provider: AuthProviders.Custom,
      method: AuthMethods.CustomToken
    }),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...Pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...Providers, ...Classes, ...SharedComponents
  ]
})
export class AppModule {}