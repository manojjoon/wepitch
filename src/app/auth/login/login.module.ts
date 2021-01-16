import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicLoginComponent} from './login.component';
import {LoginService} from '../login.services'

@NgModule({
    imports:[
        CommonModule
    ],
    declarations :[BasicLoginComponent],
    providers:[LoginService]
})
export class BasicLoginModule{}