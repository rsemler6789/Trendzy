import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Routes, RouterModule,} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabSettingPage } from './tab-setting.page';

const routes: Routes = [
  {
    path: '',
    component: TabSettingPage
  }
];

@NgModule({
  imports: [
    FormBuilder,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabSettingPage]
})
export class TabSettingPageModule {}
