import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePasswordPage } from './create-password';

@NgModule({
  declarations: [
    CreatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePasswordPage),
  ],
})
export class CreatePasswordPageModule {}
