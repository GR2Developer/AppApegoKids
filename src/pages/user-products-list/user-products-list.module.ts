import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductsListPage } from './user-products-list';

import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    UserProductsListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductsListPage),
    IonicImageLoader
  ],
})
export class UserProductsListPageModule {}
