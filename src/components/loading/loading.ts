import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@Component({
    selector: 'loading',
    templateUrl: 'loading.html'
})

export class LoadingComponent {

    loading: Loading;

    constructor(private loadingCtr: LoadingController) {
        console.log('Hello Loading Component');
    }

    public showLoading(message?: string) {
        console.log("showLoading");
        this.loading = this.loadingCtr.create({
            content: message,
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    public hideLoading() {
        console.log("hideLoading");
        if (this.loading) {
            this.loading.dismiss()
                .catch((err) => {
                    console.error(err);
            });
        }
    }

}