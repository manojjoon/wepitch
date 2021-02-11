import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppGridComponent } from './shared/app-grid/app-grid.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingComponent } from './setting/setting.component';
import {SystemSettingComponent} from '../app/Ground/SystemSetting/System-Setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { addGroundComponent } from './Ground/addground/addGround.component';
import { GroundListComponent } from './Ground/ground-list/ground-list.component';
import { GroundService } from './shared/services/ground.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { amenitiesListComponent } from './Ground/amenities-list/amenities-list.component';
import { BasicLoginComponent } from './auth/login/login.component';
import { LoginService } from './auth/login.services';
import { AppContainerComponent } from './app-container/app-container.component';
import { ModalModule } from '../app/_modal/modal.module';
import { AgGridModule } from 'ag-grid-angular';
import { APP_BASE_HREF } from '@angular/common';
import { PlayerComponent } from './users/player/player.component';
import { OrganiserComponent } from './users/organiser/organiser.component';
import { ImageFormatterComponent } from "././shared/image-formatter.component";
import { SafePipe } from './shared/pipes/safe.pipe';
import { ActionComponent } from './shared/action-formatter.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AppStteperComponent } from './app-stteper/app-stteper.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponent } from './calender/calender.component';
import { BookingListComponent } from './Ground/booking/list/booking-list.component';
import { BookingComponent } from './Ground/booking/booking.component';
import { TeamListComponent } from '../app/Ground/Team/Team-list.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDateRangeModule } from 'ngx-daterange';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AllUserComponent } from './users/AllUsers/AllUser.Component';
import { LoaderComponent } from './shared/services/loader/loader.component';
import { LoaderService } from './shared/services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SettingComponent,
    SystemSettingComponent,
    DashboardComponent,
    addGroundComponent,
    GroundListComponent,
    BasicLoginComponent,
    amenitiesListComponent,
    AppContainerComponent,
    AppGridComponent,
    PlayerComponent,
    OrganiserComponent,
    AllUserComponent,
    ImageFormatterComponent,
    ActionComponent,
    SafePipe,
    AppStteperComponent,
    CalenderComponent,
    BookingComponent,
    BookingListComponent,
    TeamListComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ModalModule,
    AgGridModule.withComponents([ImageFormatterComponent, ActionComponent]),
    MatStepperModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgxDateRangeModule,
    CKEditorModule,
    MatProgressSpinnerModule
  ],
  providers: [GroundService, LoginService, LoaderService],
  bootstrap: [AppComponent],
  exports: [
    MatDatepickerModule
  ],
  entryComponents:[LoaderComponent]
})
export class AppModule { }
