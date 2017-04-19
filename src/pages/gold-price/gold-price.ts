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
  templateUrl: 'gold-price.html',
})
export class GoldPricePage {

  goldPriceData? : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RestAPIService, private loading:LoadingComponent) {
      this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoldPrice');
  }

  private getData(refresher?) {
    if(!refresher) {
      this.loading.showLoading("Loading...");
    }
    this.restService.getGoldPriceData().subscribe((res) => {
        console.log('GoldPricePage - getGoldPriceData res :', res);
        this.goldPriceData = res;
        refresher ? refresher.complete() : this.loading.hideLoading();
      }, (err)=>{
         refresher ? refresher.complete() : this.loading.hideLoading();
      });
  }

  public refreshContent(refresher) {
    this.getData(refresher);
  }

}
