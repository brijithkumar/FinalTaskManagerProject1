import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {WorkOutService} from '../../services/work-out.service';
import {WorkOut} from '../../entities/workout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewlist-workout',
  templateUrl: './viewlist-workout.component.html',
  styleUrls: ['./viewlist-workout.component.css']
})
export class ViewlistWorkoutComponent implements OnInit {
  allWorkOuts: WorkOut[];
  statusCode: any;
  

  constructor(private workOutService:WorkOutService,private _router:Router) { }
  workouts:Array<WorkOut>;
  ngOnInit() {
      this.getAllTasks();
  }

  getAllTasks() {
    this.workOutService.getAllTasks()
    .subscribe(
            data => this.workouts = data,
            errorCode =>  this.statusCode = errorCode);   
}

editTask(workout){
  this.workOutService.setCurrentTaskDetails(workout);
  this._router.navigate(['/updateWorkOut']);
}

deleteTask(workoutId: string) {
  this.workOutService.deleteTaskDetailsById(workoutId)
    .subscribe(successCode => {
      this.statusCode = successCode;
      this.getAllTasks();	
   },
   errorCode => this.statusCode = errorCode);    
}

endTask(workoutId: string) {
  this.workOutService.endTask(workoutId)
    .subscribe(successCode => {
      this.statusCode = successCode;
      this.getAllTasks();	
   },
   errorCode => this.statusCode = errorCode);    
}

}
