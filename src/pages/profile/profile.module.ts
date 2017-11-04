import { DirectivesModule } from './../../directives/directives.module';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    DirectivesModule,
    PipesModule
  ],
  exports: [
    ProfilePage
  ]
})

export class ProfilePageModule { }