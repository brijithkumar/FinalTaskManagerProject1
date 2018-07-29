import { Injectable } from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http'
import {WorkOut} from '../entities/workout';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import {map} from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class WorkOutService {

  constructor(private http:Http) { }

  baseUrl: string = 'http://localhost:8084/api/';

  workout:WorkOut;

  addWorkOut(workout: WorkOut):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.post(this.baseUrl + 'saveTaskDetails', workout, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }
     


    getAllTasks(): Observable<WorkOut[]> {
      return this.http.get(this.baseUrl + 'getTaskDetails')
       .map(this.extractData)
       .catch(this.handleError);

  }

  searchParentTasks(task: string): Observable<String[]> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders});
      return this.http.post(this.baseUrl + 'getParentTaskNames',task, options)
       .map(this.extractData)
       .catch(this.handleError);

  }
  

  updateTaskDetails(workOut: WorkOut):Observable<any> {
      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: cpHeaders });
            return this.http.put(this.baseUrl + 'updateTaskDetails', workOut, options)
                   .map(success => success.status)
                   .catch(this.handleError);
        }

  deleteTaskDetailsById(id: string): Observable<number> {
          let cpHeaders = new Headers({ 'Content-Type': 'application/json' });	
          let options = new RequestOptions({ headers: cpHeaders});
          return this.http.delete(this.baseUrl + 'deleteTaskDetails/'+id, options)
                 .map(success => success.status)
                 .catch(this.handleError);
            }


  endTask(id: string): Observable<any> {
              let cpHeaders = new Headers({ 'Content-Type': 'application/json' });	
              let options = new RequestOptions({ headers: cpHeaders});
              return this.http.put(this.baseUrl + 'endTask',id, options)
                     .map(success => success.status)
                     .catch(this.handleError);
                }
  
  setCurrentTaskDetails(currentworkOutObject) {
     this.workout=currentworkOutObject;
  }

  getCurrentTaskDetails(){
    return this.workout;
  }
  
  private extractData(res: Response | any) {
      let body = res.json();
            return body;
        }

      
  private handleError (error: Response | any) {
       // console.error(error.message || error);
        return Observable.throw(error.status);
  }
    
}
