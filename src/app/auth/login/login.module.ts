import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginService} from '../login.services'

@NgModule({
    imports:[
        CommonModule
    ],
    declarations :[],
    providers:[LoginService]
})
export class BasicLoginModule{}