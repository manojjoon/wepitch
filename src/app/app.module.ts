import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import {AppGridComponent} from './shared/app-grid/app-grid.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { addGroundComponent } from './Ground/addground/addGround.component';
import { GroundListComponent } from './Ground/ground-list/ground-list.component';
import { GroundService } from './shared/services/ground.service';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { amenitiesListComponent } from './Ground/amenities-list/amenities-list.component';
import { BasicLoginComponent } from './auth/login/login.component';
import { LoginService } from './auth/login.services';
import { AppContainerComponent } from './app-container/app-container.component';
import{ ModalModule } from '../app/_modal/modal.module';
import { AgGridModule } from 'ag-grid-angular'; 
import { APP_BASE_HREF } from '@angular/common';
import { PlayerComponent } from './users/player/player.component';
import { OrganiserComponent } from './users/organiser/organiser.component';
import { ImageFormatterComponent } from "././shared/image-formatter.component";
import { SafePipe } from './shared/pipes/safe.pipe';
import { ActionComponent } from './shared/action-formatter.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SettingComponent,
    DashboardComponent,
    addGroundComponent,
    GroundListComponent,
    BasicLoginComponent,
    amenitiesListComponent,
    AppContainerComponent,
    AppGridComponent,
    PlayerComponent,
    OrganiserComponent,
    ImageFormatterComponent,
    ActionComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ModalModule,
    AgGridModule.withComponents([ImageFormatterComponent, ActionComponent])
  ],
  providers: [GroundService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
