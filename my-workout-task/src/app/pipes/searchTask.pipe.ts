import { Pipe, PipeTransform } from '@angular/core';
import { WorkOut } from '../entities/workout';
import * as moment from 'moment';


@Pipe({
    name: 'searchtasks'
})
export class SearchTaskPipe implements PipeTransform {

    transform(value: Array<WorkOut>, taskSearch:string,
        parentTaskSearch:string,priorityFromSearch:number,
        priorityToSearch:number,
        startDateSearch:Date,
        endDateSearch:Date) {
       if(value && value.length){
           return value.filter(val=>{
               if(taskSearch && 
                val.task.toLowerCase().indexOf(taskSearch.toLowerCase())===-1){
                    return false;
                    }
                if(parentTaskSearch && 
                val.parentTask.toLowerCase().indexOf(parentTaskSearch.
                    toLowerCase())===-1){
                     return false;
                     }
                if(priorityFromSearch && 
                        val.priority <priorityFromSearch) {
                             return false;
                    }
                if(priorityToSearch && 
                      val.priority >priorityToSearch) {
                        return false;
                    }
                if(startDateSearch && new Date(startDateSearch)>new 
                    Date(val.startDate)) {
                            return false;  
                      }
                if(endDateSearch && new Date(endDateSearch)<new 
                      Date(val.endDate)) {
                              return false;  
                        }
                return true;
           })
       }
       else{
           return value;
       }
    }

}