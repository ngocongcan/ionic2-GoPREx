import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { IonicStorageModule } from '@ionic/storage';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { GoPRExApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { LaunchReview } from '@ionic-native/launch-review';
import { EmailComposer } from '@ionic-native/email-composer';

// Classes
import { AppConfig } from './app.config';
// Config
// Pages
import { AboutPage } from '../pages/about/about';
import { ChartsPage } from '../pages/charts/charts';
import { GoldPricePage } from '../pages/gold-price/gold-price';
import { RateExchangePage } from '../pages/rate-exchange/rate-exchange';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { CurrencyConverterPage } from '../pages/currency-converter/currency-converter'
// Shared Components
import { AlertComponent } from '../components/alert/alert';
import { LoadingComponent } from '../components/loading/loading';
// Components
import { ConnectionInstablePopupPage } from '../components/connection-instable-popup/connection-instable-popup';
import { HorizontalTabsComponent } from '../components/horizontal-tabs/horizontal-tabs';
// Providers
import { RestAPIService } from '../providers/rest-api-service';
import { ConnectivityService } from '../providers/connectivity-service';

// Classes
// Pipes
import { PricePipe } from '../pipes/price';

// Third party Module
import { Ionic2RatingModule } from 'ionic2-rating';

//---
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const Pages = [
  ConnectionInstablePopupPage,
  RateExchangePage,
  GoldPricePage,
  ChartsPage,
  AboutPage,
  TabsPage,
  SplashPage,
  CurrencyConverterPage
]

const Components = [
  HorizontalTabsComponent
]
const SharedComponents = [
  AlertComponent,
  LoadingComponent
]
const Pipes = [
  PricePipe
]

const Classes = [
  AppConfig
]
const Providers = [
  RestAPIService,
  ConnectivityService
]

const Modules = [
  Ionic2RatingModule
]

@NgModule({
  declarations: [
    GoPRExApp,
    ...Pages,
    ...Components,
    ...SharedComponents,
    ...Pipes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(GoPRExApp),
    IonicStorageModule.forRoot({ name: '__goPRexDB', }),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpModule,
    ...Modules
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    GoPRExApp,
    ...Pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Network,
    LaunchReview,
    EmailComposer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ...Providers, ...Classes, ...SharedComponents
  ]
})
export class AppModule { }
