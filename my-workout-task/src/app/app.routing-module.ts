import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { ViewlistWorkoutComponent } from './components/viewlist-workout/viewlist-workout.component';
import {WorkOutService} from './services/work-out.service';
import {Ng2SliderComponent} from 'ng2-slider-component/ng2-slider.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchTaskPipe } from './pipes/searchTask.pipe';
import {UpdateWorkoutComponent} from './components/update-workout/update-workout.component';
import { AutocompleteModule } from 'ng2-input-autocomplete';



const routes: Routes = [
    { path: '', redirectTo: '/workOut', pathMatch: 'full' },
    { path: 'workOut', component: ViewlistWorkoutComponent },
    { path: 'addWorkOut', component: AddWorkoutComponent },
    { path: 'updateWorkOut', component: UpdateWorkoutComponent }
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    AutocompleteModule.forRoot()
    

  ],
  providers: [WorkOutService],
  exports: [ RouterModule ],
  declarations: [ViewlistWorkoutComponent,SearchTaskPipe,
    WorkoutsComponent,AddWorkoutComponent,UpdateWorkoutComponent]
})
export class AppRoutingModule { }