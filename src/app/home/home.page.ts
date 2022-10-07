import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform, ModalController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { async } from '@angular/core/testing';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  day: any;
  days: any;
  month: any;
  year: any;
  time: any;

  ch0: any;
  ch0n: any;
  ch1: any;
  ch1n: any;
  ch2: any;
  ch2n: any;
  ch3: any;
  ch3n: any;
  ch4: any;
  ch4n: any;
  ch5: any;
  ch5n: any;
  // to: any = '-';
  to: any = 'ถึง';
  i: any = 1;

  checkme: any;

  new: any;
  checkchar: any;

  number_call: any;
  json_que_call: any;

  times = new Date()
  thday = new Array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์");
  thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
  timecal = "วัน" + this.thday[this.times.getDay()] + "ที่ " + this.times.getDate() + " " + this.thmonth[this.times.getMonth()] + " " + (this.times.getFullYear() + 543) + " เวลา " + this.times.toLocaleTimeString('it-IT')

  constructor(
    private nativeAudio: NativeAudio,
    public platform: Platform,
    private media: Media,
    private socket: Socket,
    public modalCtrl: ModalController
  ) { }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { datas: this.new }
    })

    await modal.present();
    let data = await modal.onWillDismiss()
    if (data.data != null) {
      this.new = data.data
    }
    // console.log(this.new.length)
    // console.log(this.new)

  }

  ionViewWillEnter() {

    this.nativeAudio.preloadSimple('getnumber', 'assets/getnumber.mp3');
    this.nativeAudio.preloadSimple('getdrug', 'assets/getdrug.mp3');
    this.nativeAudio.preloadSimple('0', 'assets/0.mp3');
    this.nativeAudio.preloadSimple('1', 'assets/1.mp3');
    this.nativeAudio.preloadSimple('2', 'assets/2.mp3');
    this.nativeAudio.preloadSimple('3', 'assets/3.mp3');
    this.nativeAudio.preloadSimple('4', 'assets/4.mp3');
    this.nativeAudio.preloadSimple('5', 'assets/5.mp3');
    this.nativeAudio.preloadSimple('6', 'assets/6.mp3');
    this.nativeAudio.preloadSimple('7', 'assets/7.mp3');
    this.nativeAudio.preloadSimple('8', 'assets/8.mp3');
    this.nativeAudio.preloadSimple('9', 'assets/9.mp3');
    this.nativeAudio.preloadSimple('to', 'assets/to.mp3');

  }

  backbt

  ngAfterViewInit() {
    this.backbt = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp()
    })
  }

  ngOnDestroy() {
    this.backbt.unsubscribe()
  }

  ngOnInit() {


    // setInterval(() => {
    //   this.ch1
    //   this.ch2
    //   this.ch3
    //   this.ch4
    //   this.ch5
    // this.times = new Date();
    // this.timecal = "วัน" + this.thday[this.times.getDay()] + "ที่ " + this.times.getDate() + " " + this.thmonth[this.times.getMonth()] + " " + (this.times.getFullYear() + 543) + " เวลา " + this.times.toLocaleTimeString('it-IT')
    // console.log("วัน" + this.thday[this.time.getDay()] + "ที่ " + this.time.getDate() + " " + this.thmonth[this.time.getMonth()] + " " + (this.time.getFullYear() + 543) + " เวลา " + this.time.toLocaleTimeString('it-IT'))
    // }, 1000);


    this.socket.fromEvent('day').subscribe(message => {
      //console.log(message)
      this.day = message;
    })
    this.socket.fromEvent('days').subscribe(message => {
      //console.log(message)
      this.days = message;
    })
    this.socket.fromEvent('month').subscribe(message => {
      //console.log(message)
      this.month = message;
    })
    this.socket.fromEvent('year').subscribe(message => {
      //console.log(message)
      this.year = message;
    })
    this.socket.fromEvent('time').subscribe(message => {
      // console.log(message)
      this.time = message;
    })


    this.socket.fromEvent('que').subscribe(message => {
      this.json_que_call = message;
      // console.log(this.json_que_call)
      // console.log(this.json_que_call[0].order_number)
      // console.log(this.json_que_call[0].station_id)
      // let convert = this.json_que_call[0].order_number.split("-", 2)
      // console.log(convert)
      console.log(this.json_que_call);
      console.log(this.json_que_call[0].station_id);
      console.log(this.json_que_call[0].order_number);

      if (this.i != 1) {
        const checki = this.i
        setTimeout(() => {
          if (checki == this.i) {
            this.i = 1
            console.log('NO-----')
          } else {
            console.log('OK-----')
          }
        }, 4000)
      }

      if (this.i == 1 && this.json_que_call[0].order_number.length != 0 && this.json_que_call[0].station_id.length != 0 && this.json_que_call[0].order_number.includes("-")) {
        let x;
        let j;

        let s = this.json_que_call[0].station_id;
        let number = this.json_que_call[0].order_number;
        let convert = number.split("-", 2)

        console.log(convert)

        let nf = convert[0];
        let nl = convert[1];

        console.log(nf)
        console.log(nl)
        let c = []

        // let c0, c1, c2, c3, c4, c5
        // for (j = 0; j < 6; j++) {

        //   if (j == 0) {
        //     c[0] = 0
        //     console.log(c[0])
        //   }
        //   if (j == 1) {
        //     c[1] = 2500
        //     console.log(c[1])
        //   }
        //   if (j == 2) {
        //     c[2] = 2500 + (625 * nf.length)
        //     console.log(c[2])
        //   }
        //   if (j == 3) {
        //     c[3] = 2500 + (625 * nf.length) + 2500
        //     console.log(c[3])
        //   }
        //   if (j == 4) {
        //     c[4] = 2500 + (625 * nf.length) + 2500 + (625 * nl.length)
        //     console.log(c[4])
        //   }
        //   if (j == 5) {
        //     c[5] = 2500 + (625 * nf.length) + 2500 + (625 * nl.length) + 2500
        //     console.log(c[5])
        //   }
        //   setTimeout(() => {
        //     if (this.i == 1) {
        //       setTimeout(() => {
        //         this.nativeAudio.play('getnumber');
        //         console.log('getnumber');
        //         this.i = 2;
        //       }, 1000)
        //     } else if (this.i == 2) {
        //       for (x = 0; nf.length > x; x++) {
        //         let c = nf.charAt(x);
        //         setTimeout(() => {
        //           this.nativeAudio.play(c);
        //           console.log(c);
        //         }, 1000 * x)
        //       }
        //       this.i = 3;
        //     } else if (this.i == 3) {
        //       setTimeout(() => {
        //         this.nativeAudio.play('to');
        //         console.log('to');
        //         this.i = 4;
        //       }, 1500)
        //     } else if (this.i == 4) {
        //       for (x = 0; nl.length > x; x++) {
        //         let c = nl.charAt(x);
        //         setTimeout(() => {
        //           this.nativeAudio.play(c);
        //           console.log(c);
        //         }, 1000 * x)
        //       }
        //       this.i = 5;

        //     } else if (this.i == 5) {
        //       setTimeout(() => {
        //         this.nativeAudio.play('getdrug');
        //         console.log('getdrug');
        //         this.i = 6;
        //       }, 1700)

        //     } else if (this.i == 6) {

        //       setTimeout(() => {
        //         console.log('-');
        //       }, 1000)

        //       setTimeout(() => {
        //         this.nativeAudio.play(s);
        //         console.log(s);
        //         this.i = 1;
        //       }, 1500)
        //     }
        //   }, c[j])
        // }

        for (j = 0; j < 6; j++) {

          if (j == 0) {
            c[0] = 0
            console.log(c[0])
          }
          if (j == 1) {
            c[1] = 0 + 1400
            console.log(c[1])
          }
          if (j == 2) {
            c[2] = 0 + 1400 + (800 * nf.length)
            console.log(c[2])
          }
          if (j == 3) {
            c[3] = 0 + 1400 + (800 * nf.length) + 800
            console.log(c[3])
          }
          if (j == 4) {
            c[4] = 0 + 1400 + (800 * nf.length) + 800 + (800 * nl.length)
            console.log(c[4])
          }
          if (j == 5) {
            c[5] = 0 + 1400 + (800 * nf.length) + 800 + (800 * nl.length) + 2200
            console.log(c[5])
          }

          setTimeout(() => {
            if (this.i == 1) {
              setTimeout(() => {
                this.nativeAudio.play('getnumber');
                console.log('getnumber');
                this.i = 2;
              }, 0)
            } else if (this.i == 2) {
              for (x = 0; nf.length > x; x++) {
                let c = nf.charAt(x);
                setTimeout(() => {
                  this.nativeAudio.play(c);
                  console.log(c);
                }, 800 * x)
              }
              this.i = 3;
            } else if (this.i == 3) {
              setTimeout(() => {
                this.nativeAudio.play('to');
                console.log('to');
                this.i = 4;
              }, 0)
            } else if (this.i == 4) {
              for (x = 0; nl.length > x; x++) {
                let c = nl.charAt(x);
                setTimeout(() => {
                  this.nativeAudio.play(c);
                  console.log(c);
                }, 800 * x)
              }
              this.i = 5;

            } else if (this.i == 5) {
              setTimeout(() => {
                this.nativeAudio.play('getdrug');
                console.log('getdrug');
                this.i = 6;
              }, 0)

            } else if (this.i == 6) {

              setTimeout(() => {
                console.log('-');
              }, 0)

              setTimeout(() => {
                this.nativeAudio.play(s);
                console.log(s);
                // this.i = 1;
              }, 0)

              setTimeout(() => {
                console.log('to i = 1');
                this.i = 1;
              }, 1000)
            }
          }, c[j])
        }

        this.socket.emit('after_call', [this.json_que_call[0].orderindex,this.json_que_call[0].station_id]);
        this.socket.emit('after_call1', 55555);
      }
    })

    this.socket.fromEvent('que_ch0').subscribe(message => {
      // console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        this.ch0 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch0 = ''
      }
      // this.ch0 = convert[0];
      // this.ch0n = convert[1];
    })
    this.socket.fromEvent('que_ch1').subscribe(message => {
      // console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        this.ch1 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch1 = ''
      }

      // this.ch1 = convert[0];
      // this.ch1n = convert[1];
    })
    this.socket.fromEvent('que_ch2').subscribe(message => {
      //console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        // this.ch2 = message[0].order_number;
        this.ch2 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch2 = ''
      }
      // this.ch2 = convert[0];
      // this.ch2n = convert[1];
    })
    this.socket.fromEvent('que_ch3').subscribe(message => {
      // console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        // this.ch3 = message[0].order_number;
        this.ch3 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch3 = ''
      }
      // this.ch3 = convert[0];
      // this.ch3n = convert[1];
    })
    this.socket.fromEvent('que_ch4').subscribe(message => {
      // console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        // this.ch4 = message[0].order_number;
        this.ch4 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch4 = ''
      }
      // this.ch4 = convert[0];
      // this.ch4n = convert[1];
    })
    this.socket.fromEvent('que_ch5').subscribe(message => {
      // console.log(message[0].order_number)
      if (message[0].order_number.length != 0) {
        let convert = message[0].order_number.split("-", 2)
        // this.ch5 = message[0].order_number;
        this.ch5 = convert[0] + '<br>ถึง<br>' + convert[1];
      } else {
        this.ch5 = ''
      }
      // this.ch5 = convert[0];
      // this.ch5n = convert[1];
    })
  }


}
