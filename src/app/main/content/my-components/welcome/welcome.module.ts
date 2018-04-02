import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';

const routes: Routes = [
  {
      path     : 'welcome',
      component: WelcomeComponent
  }
];

@NgModule({
  imports     : [
      SharedModule,
      RouterModule.forChild(routes),
  ],
  declarations: [
    WelcomeComponent
  ]
})

export class WelcomeModule { }