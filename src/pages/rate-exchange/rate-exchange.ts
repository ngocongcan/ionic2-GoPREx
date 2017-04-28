import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestAPIService } from '../../providers/rest-api-service';
import { LoadingComponent } from '../../components/loading/loading';
import { CurrencyConverterPage } from '../currency-converter/currency-converter';

/**
 * Generated class for the RateExchange page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-rate-exchange',
  templateUrl: 'rate-exchange.html'
})
export class RateExchangePage {

  rateExchangeData?: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RestAPIService, public loading: LoadingComponent) {
    this.getData();
    this.getRateData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateExchange');
  }

  private getRateData() {
    this.restService.getAllRate().subscribe((res) => {
      // console.log("RateExchangePage getRateData res :", JSON.stringify(res));
      if (res && res.length) {
        this.rateExchangeData = res[0];
      }
    }, (err) => {
      console.log("RateExchangePage getRateData err :", JSON.stringify(err));
    })
  }


  private getData(refresher?) {
    var loading;
    if (!refresher || !this.rateExchangeData) {
      loading = this.loading.showLoading("Loading...");
    }
    this.restService.getRateExchangeData(refresher).subscribe((res) => {
      // console.log('RateExchangePage - getRateExchangeData res :', JSON.stringify(res));
      if (refresher) {
        refresher.complete();
      }
      if (loading) {
        loading.dismissAll();
      }
      this.rateExchangeData = res;
    }, (err) => {
      console.log("RateExchangePage getData error :", JSON.stringify(err));
      if (refresher) {
        refresher.complete();
      }
      if (loading) {
        loading.dismissAll();
      }
    });
  }

  public refreshContent(refresher) {
    this.getData(refresher);
  }

  onClickItem(item) {
    this.navCtrl.push(CurrencyConverterPage, {
      selectedItem: item,
      data: this.rateExchangeData
    })
  }

}
