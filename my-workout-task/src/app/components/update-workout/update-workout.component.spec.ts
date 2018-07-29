import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { UpdateWorkoutComponent } from './update-workout.component';
import { HttpModule } from '@angular/http';
import { WorkOutService } from 'src/app/services/work-out.service';
import { getAllTasks } from 'src/app/unittest/unitTests-task';
import { By } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const WORKOUTS=getAllTasks();

describe('UpdateWorkoutComponent', () => {
  let component: UpdateWorkoutComponent;
  let fixture: ComponentFixture<UpdateWorkoutComponent>;
  let service:WorkOutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkoutComponent ],
      imports:[HttpModule,FormsModule,ReactiveFormsModule,CommonModule,RouterTestingModule],
      providers:[WorkOutService],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service=TestBed.get(WorkOutService);
    component.workOut=WORKOUTS[0];
  });

  it('should check the update task to be false', () => {
    component.onSubmit();
    expect(component.submitted).toBeFalsy();
  });

  it('should check the update task to be called', () => {
    const spyOnUpdate = spyOn(component, 'onSubmit').and.callThrough();
     component.myupdateForm.controls['task'].setValue(WORKOUTS[0].task);
     component.myupdateForm.controls['parentTask'].setValue(WORKOUTS[0].parentTask);
     component.myupdateForm.controls['priority'].setValue(WORKOUTS[0].priority);
     component.myupdateForm.controls['startDate'].setValue(WORKOUTS[0].startDate);
     component.myupdateForm.controls['endDate'].setValue(WORKOUTS[0].endDate);
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#updateTask'));
     button.nativeElement.click()
     expect(spyOnUpdate.calls.any()).toBe(true, 'component  onSubmit called');
   });

  it('should check status code when update a task', () => {
    spyOn(service, 'updateTaskDetails').and.returnValue(
      Observable.from([null]));
    component.myupdateForm.controls['task'].setValue(WORKOUTS[0].task);
    component.myupdateForm.controls['parentTask'].setValue(WORKOUTS[0].parentTask);
    component.myupdateForm.controls['priority'].setValue(WORKOUTS[0].priority);
    component.myupdateForm.controls['startDate'].setValue(WORKOUTS[0].startDate);
    component.myupdateForm.controls['endDate'].setValue(WORKOUTS[0].endDate);
    fixture.detectChanges();
    component.onSubmit();
    expect(component.statusCode).not.toBeDefined;
  });

  it('should cancel the form when cancel button is clicked', () => {
    const spyOnUpdate = spyOn(component, 'onCancel').and.callThrough();
     fixture.detectChanges();
     const button = fixture.debugElement.query(By.css('#cancelTask'));
     button.nativeElement.click();
     expect(spyOnUpdate.calls.any()).toBe(true, 'component  cancel task called');
   });

   /*
   it('should set the workout tasks when id is not null ', () => {
    component.workOut=WORKOUTS[0];
    component.ngOnInit();
    expect(component.workOut.id).toEqual(1);

   });*/

   

});


