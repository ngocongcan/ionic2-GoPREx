import { Injectable } from '@angular/core';
import { ModalController, Modal, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ConnectionInstablePopupPage } from '../components/connection-instable-popup/connection-instable-popup';

@Injectable()
export class ConnectivityService {

    public isOnline: boolean;
    private isDevice: boolean;
    private model: Modal;
    constructor(public platform: Platform, public modalCtrl: ModalController,
        private network: Network) {
        console.log("init ConnectivityService");
        this.platform.ready().then(() => {
            this.isDevice = this.platform.is('cordova');
            if (this.isDevice) {
                this.subscribeNetworkStatus();
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    private subscribeNetworkStatus() {
        this.network.onDisconnect().subscribe(type => {
            console.log("Network goes offline");
            this.isOnline = false;
            this.showNetworkInstablePopup();
        }, error => {
            console.log("error");
        });

        this.network.onConnect().subscribe(type => {
            this.isOnline = true;
            console.log("Network goes online");
            this.hideNetworkInstablePopup();
        }, error => {

        });
    }

    private showNetworkInstablePopup() {
        this.model = this.modalCtrl.create(ConnectionInstablePopupPage);
        this.model.present();
    }

    private hideNetworkInstablePopup() {
        if (this.model) {
            this.model.dismiss();
        }
    }

    public isAvailable() {
        if (this.isDevice) {
            return this.network.type != "unknown";
        } else {
            return navigator.onLine;
        }
    }
}