import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChartsPage } from '../charts/charts';
import { GoldPricePage } from '../gold-price/gold-price';
import { RateExchangePage } from '../rate-exchange/rate-exchange';

import { AppConfig } from '../../app/app.config';
import { RestAPIService } from '../../providers/rest-api-service';

@Component({
  templateUrl: 'tabs.html',
  providers : [RestAPIService]
})
export class TabsPage {

  tab1Root = RateExchangePage;
  tab2Root = GoldPricePage;
  tab3Root = ChartsPage;
  tab4Root = AboutPage;
  
  constructor(private restService: RestAPIService) {
    console.log('Hello TabsPage');
  }
}
