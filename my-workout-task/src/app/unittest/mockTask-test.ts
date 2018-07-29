import { WorkOutService } from "src/app/services/work-out.service";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { WorkOut } from '../entities/workout';
import { async } from "@angular/core/testing";
import {getAllTasks} from '../unittest/unitTests-task';

@Injectable({
    providedIn: 'root'
})
export class MockTestWorkOutService extends WorkOutService{
    constructor() {
        super(null);
    }
    workOuts: WorkOut[] = getAllTasks();
    results:Observable<any>;

   // getAllTasks(): Observable<WorkOut[]> {
      //  return this.results=asyncData(this.workOuts);
  
   // }

}