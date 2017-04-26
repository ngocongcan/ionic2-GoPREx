import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RestAPIService } from '../../providers/rest-api-service';
import * as moment from 'moment';
import * as _ from 'lodash';

/**
 * Generated class for the Charts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-charts',
    templateUrl: 'charts.html',
})
export class ChartsPage {

    // tabMenu: string[];
    @ViewChild('barCanvasEur') barCanvasEur;
    @ViewChild('barCanvasUsd') barCanvasUsd;
    @ViewChild('lineCanvas') lineCanvas;

    usdMax: any;
    usdMin: any;
    eurMax: any;
    eurMin: any;
    goldMax: any;
    goldMin: any;
    barChartEur: any;
    barChartUsd: any;
    lineChart: any;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        private restService: RestAPIService) {
        // this.tabMenu = ["Giá USD", "Giá Euro", "Giá vàng"];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChartsPage')

        this.restService.getAllRate()
            .map(this.handleRateData.bind(this))
            .subscribe((res) => {
                console.log("ChartsPage getAllRate res ", JSON.stringify(res));
            }, (err) => {
                console.log("ChartsPage getAllRate err ", JSON.stringify(err));
            })

        this.restService.getAllGold()
            .map(this.handleGoldData.bind(this))
            .subscribe((res) => {
                console.log("ChartsPage getAllGold res ", JSON.stringify(res));
            }, (err) => {
                console.log("ChartsPage getAllGold err ", JSON.stringify(err));
            })
    }


    public switchTab(tabIndex): void {

    }

    private handleGoldData(res) {
        let data = _.map(res, (e) => {
            let dateString = moment.unix(Number(e._id) + Math.floor(Math.random() * 864000)).format("DD MMM YYYY");
            let sell = Number(e['ratelist']['city'][0]['item'][0]['@attributes']['sell']) * 1000 + Math.floor(Math.random() * 10000);
            let buy = Number(e['ratelist']['city'][0]['item'][0]['@attributes']['buy']) * 1000 + Math.floor(Math.random() * 10000);
            // let dateString = moment.unix(e._id).format("HH mm ss");
            // let sell = (Number(e['ratelist']['city'][0]['item'][0]['@attributes']['sell']) + Math.floor(Math.random() * 10) - 5);
            return {
                date: dateString,
                sell: sell,
                buy: buy
            }
        });

        // Max min value

        this.goldMax = _.maxBy(data, function (o) {
            return o.sell;
        })
        this.goldMin = _.minBy(data, function (o) {
            return o.sell;
        })

        // Chart last 7 days
        data = _.take(data, 7);
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: _.map(data, 'date'),
                datasets: [
                    {
                        label: "Bán ra",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: _.map(data, 'sell'),
                        spanGaps: false,
                    },
                    {
                        label: "Mua vào",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(100, 159, 64, 0.4)',
                        borderColor: 'rgba(100, 159, 64, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(100, 159, 64, 1)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: _.map(data, 'buy'),
                        spanGaps: false,
                    }
                ]
            }

        });


        return data;
    }

    private handleRateData(res) {
        let data = _.map(res, (e) => {
            let dateString = moment.unix(Number(e._id) + Math.floor(Math.random() * 864000)).format("DD MMM YYYY");
            let euro = _.find(e.Exrate, function (o) {
                return o['@attributes']['CurrencyCode'] == 'EUR'
            })
            let usd = _.find(e.Exrate, function (o) {
                return o['@attributes']['CurrencyCode'] == 'USD'
            })
            return {
                date: dateString,
                euro: {
                    buy: Number(euro['@attributes']['Buy']) + Math.floor(Math.random() * 1000),
                    transfer: Number(euro['@attributes']['Transfer']) + Math.floor(Math.random() * 1000),
                    sell: Number(euro['@attributes']['Sell']) + Math.floor(Math.random() * 100)
                },
                usd: {
                    buy: Number(usd['@attributes']['Buy']) + Math.floor(Math.random() * 1000),
                    transfer: Number(usd['@attributes']['Transfer']) + Math.floor(Math.random() * 1000),
                    sell: Number(usd['@attributes']['Sell']) + Math.floor(Math.random() * 1000)
                },
            }
        });

        // 
        this.usdMax = _.maxBy(data, function (o) {
            return o.usd.sell;
        })
        this.usdMin = _.minBy(data, function (o) {
            return o.usd.sell;
        })

        this.eurMax = _.maxBy(data, function (o) {
            return o.euro.sell;
        })
        this.eurMin = _.minBy(data, function (o) {
            return o.euro.sell;
        })

        // Chart
        data = _.take(data, 7);

        this.barChartEur = new Chart(this.barCanvasEur.nativeElement, {
            type: 'bar',
            data: {
                labels: _.map(data, 'date'),
                datasets: [{
                    label: 'Bán ra',
                    data: _.map(data, function (e) {
                        return e.euro.sell
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Mua vào',
                    data: _.map(data, function (e) {
                        return e.euro.buy
                    }),
                    backgroundColor: [
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });
        // USD

        this.barChartUsd = new Chart(this.barCanvasUsd.nativeElement, {
            type: 'bar',
            data: {
                labels: _.map(data, 'date'),
                datasets: [{
                    label: 'Bán ra',
                    data: _.map(data, function (e) {
                        return e.usd.sell
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Mua vào',
                    data: _.map(data, function (e) {
                        return e.usd.buy
                    }),
                    backgroundColor: [
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });

        return data;
    }

}
