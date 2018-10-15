import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductsListPage } from './user-products-list';

@NgModule({
  declarations: [
    UserProductsListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductsListPage),
  ],
})
export class UserProductsListPageModule {}
