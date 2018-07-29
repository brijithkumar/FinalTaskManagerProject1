import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {Component,NO_ERRORS_SCHEMA} from '@angular/core';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkOutService } from 'src/app/services/work-out.service';
import { Observable } from 'rxjs/Observable';
import {getAllTasks} from '../../unittest/unitTests-task';
import { By } from '@angular/platform-browser';
import {WorkOut} from '../../entities/workout';


/*@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }
const router = {
  navigate: jasmine.createSpy('navigate')
}*/

let service:WorkOutService;
let workOut:WorkOut;
const WORKOUTS = getAllTasks()

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let spyOnAdd: jasmine.Spy;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkoutComponent ],
      imports:[RouterTestingModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[WorkOutService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    service=TestBed.get(WorkOutService);
    fixture.detectChanges();
   // component.webGlObject=null;
  });

  it('should check the save task to be false', () => {
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
  });

  it('should check the save task to be called', () => {
    spyOnAdd = spyOn(component, 'onSubmit').and.callThrough();
     component.myForm.controls['task'].setValue(WORKOUTS[0].task);
     component.myForm.controls['parentTask'].setValue(WORKOUTS[0].parentTask);
     component.myForm.controls['priority'].setValue(WORKOUTS[0].priority);
     component.myForm.controls['startDate'].setValue(WORKOUTS[0].startDate);
     component.myForm.controls['endDate'].setValue(WORKOUTS[0].endDate);
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#save'));
     button.nativeElement.click()
     expect(spyOnAdd.calls.any()).toBe(true, 'component  onSubmit called');
   });
 
   it('should check status code when save a task', () => {
    spyOn(service, 'addWorkOut').and.returnValue(
      Observable.from([null]));
    component.myForm.controls['task'].setValue(WORKOUTS[0].task);
    component.myForm.controls['parentTask'].setValue(WORKOUTS[0].parentTask);
    component.myForm.controls['priority'].setValue(WORKOUTS[0].priority);
    component.myForm.controls['startDate'].setValue(WORKOUTS[0].startDate);
    component.myForm.controls['endDate'].setValue(WORKOUTS[0].endDate);
    fixture.detectChanges();
    component.onSubmit();
    expect(component.statusCode).not.toBeDefined;
  });

  it('should reset the form when reset button is clicked', () => {
    spyOnAdd = spyOn(component, 'resetForm').and.callThrough();
     component.myForm.controls['task'].setValue(null);
     component.myForm.controls['parentTask'].setValue(null);
     component.myForm.controls['priority'].setValue(null);
     component.myForm.controls['startDate'].setValue(null);
     component.myForm.controls['endDate'].setValue(null);
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#reset'));
     button.nativeElement.click()
     expect(spyOnAdd.calls.any()).toBe(true, 'component  reset called');
   });


});
