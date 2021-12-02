import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ImprintComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
