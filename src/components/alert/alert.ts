import { Component } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';

/*
  Generated class for the AlertBox component.
  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'alert',
  templateUrl: 'alert.html'
})

export class AlertComponent {

  constructor(private alertCtrl: AlertController) {
    console.log('Hello AlertComponent');
  }

  createInfoAlert(title?: string, subTitle?: string, message?: string): Alert {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: ['OK']
      }
    );
  }

  createInfoAlertWithCallback(okCallback, title?: string, subTitle?: string, message?: string): Alert {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: [{
          text : 'OK',
          handler: () => {
              okCallback();
            }
        }]
      }
    );
  }

  createConfirmAlert(okCallback, title?: string, subTitle?: string, message?: string) {
    return this.alertCtrl.create(
      {
        title: title,
        subTitle: subTitle,
        message: message,
        buttons: [
          {
            text: 'NO'
          },
          {
            text: 'YES',
            handler: () => {
              okCallback();
            }
          }
        ]
      }
    );
  }
}