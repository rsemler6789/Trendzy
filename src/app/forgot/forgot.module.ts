import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPage } from './forgot.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPage
  }
];

@NgModule({
  imports: [
    FormBuilder,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule {}
