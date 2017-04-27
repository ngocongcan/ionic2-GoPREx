import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CurrencyConverter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-currency-converter',
  templateUrl: 'currency-converter.html',
})

export class CurrencyConverterPage {

  data: any
  selectedItem: any;
  source: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('CurrencyConverterPage : ', navParams);
    this.data = navParams.get('data');
    this.selectedItem = navParams.get('selectedItem');
    console.log('this data :', this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencyConverter');
  }

  getDesc(): number {
    let value = Number(this.source * Number(this.selectedItem['@attributes'].Transfer));
    let newValue = Number(value.toFixed(2));
    return newValue;
  }

  onClickBack() {
    this.navCtrl.pop();
  }

}
