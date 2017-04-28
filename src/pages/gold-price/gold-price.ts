import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestAPIService } from '../../providers/rest-api-service';
import { LoadingComponent } from '../../components/loading/loading';
/**
 * Generated class for the GoldPrice page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-gold-price',
  templateUrl: 'gold-price.html'
})
export class GoldPricePage {

  goldPriceData?: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RestAPIService, private loading: LoadingComponent) {
    this.getData();
    this.getGoldData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoldPrice');
  }

  private getGoldData() {
    this.restService.getAllGold().subscribe((res) => {
      console.log("GoldPricePage getGoldData res :", JSON.stringify(res));
      if (res && res.length) {
        this.goldPriceData = res[0];
      }
    }, (err) => {
      console.log("GoldPricePage getGoldData err :", JSON.stringify(err));
    })
  }

  private getData(refresher?) {
    var loading ;
    if (!refresher || !this.goldPriceData) {
      loading = this.loading.showLoading("Loading...");
    }
    this.restService.getGoldPriceData(refresher).subscribe((res) => {
      // console.log('GoldPricePage - getGoldPriceData res :', res);
      this.goldPriceData = res;
      if (refresher) {
        refresher.complete();
      }
      if(loading) {
        loading.dismissAll();
      }
      this.getGoldData();
    }, (err) => {
      if (refresher) {
        refresher.complete();
      }
      if(loading) {
        loading.dismissAll();
      }
    });
  }

  public refreshContent(refresher) {
    this.getData(refresher);
  }

}
