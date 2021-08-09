import { Component,OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {NativeAudio} from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  day: any;
  days:any;
  month:any;
  year: any;
  time: any;

  ch1:any;
  ch2:any;
  ch3:any;
  ch4:any;
  ch5:any;
  i: any =1;

  number_call:any;
  json_que_call:any;

  constructor(
    private nativeAudio: NativeAudio,
    public platform: Platform,
     private media: Media,
    private socket: Socket
    ) {}
    ionViewWillEnter(){
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
      this.nativeAudio.preloadSimple('to','assets/to.mp3'); 
   
    }
  ngOnInit(){
   

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
    this.json_que_call =message;
    console.log(this.json_que_call);
    console.log(this.json_que_call[0].station_id);
    console.log(this.json_que_call[0].order_number);
  let x;
  let j; 

  let s = this.json_que_call[0].station_id;
  let number = this.json_que_call[0].order_number;
  let convert = number.split("-",2)

  console.log(convert)
  
  let nf = convert[0];
  let nl = convert[1];
  
  console.log(nf)
  console.log(nl)
 

  for(j=0; j < 6; j++){
    setTimeout(()=>{
if (this.i == 1) {
    setTimeout(()=>{
    this.nativeAudio.play('getnumber');
    console.log('getnumber');
     this.i=2;
  },1000)
  } else if(this.i == 2){  
   for(x= 0; nf.length > x; x++ ){
      let c =nf.charAt(x);
      setTimeout(()=>{
      this.nativeAudio.play(c);
      console.log(c);
      },1000 * x)
  }
  this.i =3;
  }else if(this.i == 3){
    setTimeout(()=>{
      this.nativeAudio.play('to');
      console.log('to');
       this.i=4;
    },1500)
  }else if(this.i == 4){
  for(x= 0; nl.length > x; x++ ){
    let c =nl.charAt(x);
    setTimeout(()=>{
    this.nativeAudio.play(c);
    console.log(c);
    },1000 * x)
}
this.i =5;

  }else if(this.i == 5){
  setTimeout(()=>{
  this.nativeAudio.play('getdrug');
  console.log('getdrug');
   this.i=6;
  },1700)
 
  }else if (this.i == 6) {

    setTimeout(()=>{
      console.log('-');
      },1000)

     setTimeout(()=>{
    this.nativeAudio.play(s);
    console.log(s);
      this.i=1;
  },1500)
  }
  },2500* j)
   }
   this.socket.emit('after_call', this.json_que_call[0].orderindex);
 })
 

  this.socket.fromEvent('que_ch1').subscribe(message => {
   // console.log(message[0].order_number)
    this.ch1 = message[0].order_number;
  })
  this.socket.fromEvent('que_ch2').subscribe(message => {
    //console.log(message[0].order_number)
    this.ch2 = message[0].order_number;
  })
  this.socket.fromEvent('que_ch3').subscribe(message => {
   // console.log(message[0].order_number)
    this.ch3 = message[0].order_number;
  })
  this.socket.fromEvent('que_ch4').subscribe(message => {
   // console.log(message[0].order_number)
    this.ch4 = message[0].order_number;
  })
  this.socket.fromEvent('que_ch5').subscribe(message => {
   // console.log(message[0].order_number)
    this.ch5 = message[0].order_number;
  })
  }
  

}
