import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewlistWorkoutComponent } from './viewlist-workout.component';
import { SearchTaskPipe } from '../../pipes/searchTask.pipe';
import { DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';
import { WorkOutService } from 'src/app/services/work-out.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {getAllTasks} from '../../unittest/unitTests-task';
import { Observable } from 'rxjs/Observable';



const WORKOUTS = getAllTasks()
 

describe('ViewlistWorkoutComponent', () => {
  let component: ViewlistWorkoutComponent;
  let fixture: ComponentFixture<ViewlistWorkoutComponent>;
  let de: DebugElement;
  let service:WorkOutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlistWorkoutComponent,SearchTaskPipe ],
      imports:[FormsModule,HttpModule,RouterTestingModule ],
      providers:[WorkOutService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
   fixture=TestBed.createComponent(ViewlistWorkoutComponent);
   component=fixture.componentInstance;
   service=TestBed.get(WorkOutService);
   
  });
  
  it('should searchTasks when input all data', () => {
    spyOn(service, 'getAllTasks').and.returnValue(
      Observable.from([WORKOUTS]));
      fixture.detectChanges();
      expect(component.workouts).toEqual(WORKOUTS);
  });


  it('should check status code when search all tasks', () => {
    spyOn(service, 'getAllTasks').and.returnValue(
      Observable.throw('error'));
      fixture.detectChanges();
    expect(component.statusCode).not.toBeDefined;
  });



   it('should edit the task', () => {
    const spy = spyOn(service, 'setCurrentTaskDetails').and.returnValue(
      Observable.empty()
    );
    component.editTask(WORKOUTS[1]);
    expect(spy).toHaveBeenCalledWith(WORKOUTS[1]);
  });
  
  it('should delete the task', () => {
   const spy = spyOn(service, 'deleteTaskDetailsById').and.callThrough();
   component.deleteTask("1");
   fixture.detectChanges();
   expect(spy).toHaveBeenCalledWith("1");
  });


  it('should check status code when delete the task', () => {
    spyOn(service, 'deleteTaskDetailsById').and.returnValue(
      Observable.throw('error'));
      fixture.detectChanges();
      component.deleteTask("1");
    expect(component.statusCode).not.toBeDefined;
  });

  it('should check in the search list when delete the task', () => {
    spyOn(service, 'deleteTaskDetailsById').and.returnValue(
      Observable.from([null]));
      fixture.detectChanges();
      component.deleteTask("1");
      const index=WORKOUTS.findIndex(
        workOut=> workOut.id===1
      );
    expect(index).toEqual(0);
  });

  it('should end the task', () => {
    const spy = spyOn(service, 'endTask').and.callThrough();
    component.endTask("1");
    expect(spy).toHaveBeenCalledWith("1");
   });

  it('should check status code when end the task', () => {
    spyOn(service, 'endTask').and.returnValue(
      Observable.throw('error'));
      fixture.detectChanges();
      component.endTask("1");
    expect(component.statusCode).not.toBeDefined;
  });

  it('should check in the search list when end the task', () => {
    spyOn(service, 'endTask').and.returnValue(
      Observable.from([WORKOUTS[1]]));
      fixture.detectChanges();
      component.endTask("1");
    expect(WORKOUTS[0].endTask).toEqual(true);
  });

});
