import { BalanceService } from './_services/balance.service';
import { BistrampService } from './_services/bistramp.service';
import { OrderBookService } from './_services/order-book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { FakeOrderBookApiService } from './_services/fake-order-book-api.service';


const appRoutes: Routes = [
    {
        path        : 'my-components',
        loadChildren: './main/content/my-components/my-components.module#MyComponentsModule'
    },
    {
        path      : '**',
        redirectTo: 'my-components/welcome'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeOrderBookApiService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        FuseMainModule,
        
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        BistrampService,
        OrderBookService,
        BalanceService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
