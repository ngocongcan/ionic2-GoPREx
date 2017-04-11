import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';

@Injectable()
export class AppConfig {

    env: string = "dev";
    projectCode : string = "FF-2014";
    appName: string = "GoPREx App";
    apiKey: string = "MWVlOWE3OTgtMzcwZi00ZGJkLTk5NjktYzA5Nzk1MDk5NGQ0";
    apiUrl: string = "api";

    deviceId : string = "123456";
    deviceInfo : {};

    constructor(private platform : Platform) {
        console.log('init AppConfig');
        platform.ready().then(() => {
            this.deviceId = Device.uuid;
            this.deviceInfo = {
                'uuid' : Device.uuid,
                'cordova' : Device.cordova,
                'model' : Device.model,
                'platform' : Device.platform,
                'version' : Device.version,
                'manufacturer' : Device.manufacturer,
                'isVirtual' : Device.isVirtual,
                'serial' : Device.serial
            } ;
            console.log("DeviceInfo :", this.deviceInfo);
        }).catch((err) => {
        console.log(err);
      });
    }
}