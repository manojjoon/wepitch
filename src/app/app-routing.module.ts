import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { addGroundComponent } from './Ground/addground/addGround.component';
import { amenitiesListComponent } from './Ground/amenities-list/amenities-list.component';
import { BasicLoginComponent } from './auth/login/login.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { AuthGuard } from './shared/services/guards/auth.guard';
import { PlayerComponent } from './users/player/player.component';
import { GroundListComponent } from './Ground/ground-list/ground-list.component';
import { BookingComponent } from './Ground/booking/booking.component';


const routes: Routes = [
  { path: "login", component: BasicLoginComponent },
  {
    path: "", component: AppContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "addGround", redirectTo: 'addGround/init' }, /**Default step is init */
      { path: "addGround/:step", component: addGroundComponent },
      { path: "addAmenities", component: amenitiesListComponent },
      { path: "players", component: PlayerComponent },
      { path: "grounds", component: GroundListComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'setting', component: SettingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
