import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';


@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})

export class LoadingComponent {

    loading : Loading;

    constructor(private loadingCtr: LoadingController) {
        console.log('Hello Loading Component');
    }

    public showLoading(message? : string) {
        
        this.loading = this.loadingCtr.create({
            content: message
        });
        this.loading.onDidDismiss(()=> {
            this.loading = null;
        })
        this.loading.present().catch((err)=>{
            console.log('showLoading err: ', err);
        });
    }

    public hideLoading() {
        
       if(this.loading) {
            this.loading.dismiss().catch((err) => {
                console.log('hideLoading err: ', err);
            });
        }
    }

}
