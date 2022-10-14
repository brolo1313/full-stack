import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    homeRouting
  ]
})
export class HomeModule { }
