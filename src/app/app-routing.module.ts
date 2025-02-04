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
import { TeamListComponent } from './Ground/Team/Team-list.component';
import{OrganiserComponent} from './users/organiser/organiser.component';
import {SystemSettingComponent} from '../app/Ground/SystemSetting/System-Setting.component';
import { TournamentListComponent } from './Ground/Tournament/Tournament-list.component';
import{AddTournamentComponent} from '../app/Tournament/add-tournament/add-tournament.component';
//import{PrizesComponent} from '../app/Prizes/prizes/prizes.component';
import{PrizeComponent} from '../app/Prizes/prizes/prizes.component'

const routes: Routes = [
  { path: "login", component: BasicLoginComponent },
  {
    path: "", component: AppContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      {
        path: "addGround", redirectTo: 'addGround/init'
      },
      {
        path: "addGround/:step", component: addGroundComponent
      },
      {
        path: "addGround/:step/:id", component: addGroundComponent
      },


      
      {
        path: "addTournament", redirectTo: 'addTournament/init'
      },
      {
        path: "addTournament/:step", component: AddTournamentComponent
      },
      {
        path: "addTournament/:step/:id", component: AddTournamentComponent
      }, /**Default step is init */
      { path: "addAmenities", component: amenitiesListComponent },
      { path: "players", component: PlayerComponent },
      { path: "grounds", component: GroundListComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'setting', component: SettingComponent }, 
      { path: 'team', component: TeamListComponent },
      {path : 'AllUser',component : OrganiserComponent},
      {path : 'systemsetting',component : SystemSettingComponent},
      {path : 'Tournaments', component : TournamentListComponent},
      {path : 'addTournament',component : AddTournamentComponent},
      // {path : 'prizes',component : PrizesComponent},
      {path : 'prize',component : PrizeComponent},
   

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
