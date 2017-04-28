import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@Component({
    selector: 'loading',
    templateUrl: 'loading.html'
})

export class LoadingComponent {


    constructor(private loadingCtr: LoadingController) {
        console.log('Hello Loading Component');
    }

    public showLoading(message?: string) : Loading {
        console.log("showLoading");
        let loading = this.loadingCtr.create({
            content: message,
            dismissOnPageChange: true,
            duration: 5000,
        });
        loading.present().catch(err => console.error(JSON.stringify(err)));

        return loading;
        
    }

}