import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Media } from '@ionic-native/media/ngx';
import { HttpClientModule } from '@angular/common/http';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://192.168.42.132:3040', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
  HttpClientModule, 
 IonicModule.forRoot(),
     SocketIoModule.forRoot(config),
      AppRoutingModule,
      NgbModule
       ],
  providers: [
    StatusBar,
    SplashScreen,
     Media,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
     },NativeAudio
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
