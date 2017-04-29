import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaunchReview } from '@ionic-native/launch-review';
import { Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

const googleAppId: string = 'com.nlpapps.goprex';
const appleAppId: string = '1231079222';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  rate: number = 0;
  isIOS: boolean = false;
  emailAvailable: boolean = false;
  constructor(public navCtrl: NavController, private launchReview: LaunchReview, platform: Platform,
    private mailComposer: EmailComposer) {
    if (platform.is('ios')) {
      // This will only print when on iOS
      this.isIOS = true;
      console.log("I'm an iOS device!");
    }

    this.mailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
        this.emailAvailable = available;
      }
    }).catch(err => console.log(err));


  }

  onModelChange($event) {
    console.log("rate value :", this.rate);
    if (this.rate > 3) {
      this.launchAppReview();
    } else {
      this.sendFeedback();
    }
  }

  private launchAppReview() {

    let appId = this.isIOS ? appleAppId : googleAppId;
    this.launchReview.launch(appId)
      .then(() => console.log('Successfully launched store app')
      ).catch(err => console.log(err));

  }

  private sendFeedback() {

    if (!this.emailAvailable) return;
    let email = {
      to: 'ngocongcan@gmail.com',
      subject: 'GoPREx - Ý kiến đóng góp',
      body: '',
      isHtml: true
    };

    // Send a text message using default options
    this.mailComposer.open(email);
  }



}
