import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the RequestQuotation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'connection-instable-popup',
  templateUrl: 'connection-instable-popup.html'
})
export class ConnectionInstablePopupPage {

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionInstablePopupPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

}
