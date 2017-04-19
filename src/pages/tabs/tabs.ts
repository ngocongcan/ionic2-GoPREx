import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChartsPage } from '../charts/charts';
import { GoldPricePage } from '../gold-price/gold-price';
import { RateExchangePage } from '../rate-exchange/rate-exchange';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RateExchangePage;
  tab2Root = GoldPricePage;
  tab3Root = ChartsPage;
  tab4Root = AboutPage;
  
  constructor() {
    console.log('Hello TabsPage');
  }
}
