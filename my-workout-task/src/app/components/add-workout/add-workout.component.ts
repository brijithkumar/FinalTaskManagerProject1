import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {WorkOutService} from '../../services/work-out.service';
import {Router} from '@angular/router';
import {WorkOut} from '../../entities/workout';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/Rx";

declare var webGlObject: any;


@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit {
  myForm:FormGroup;
  message:string;
  submitted = false;
  statusCode: number;
  results: any[] = [];
  selectedItem: any = '';
  inputChanged: any = '';
  //webGlObject:any=getConstants();

  constructor(private workOutService:WorkOutService,
    private router:Router) {
     }

  ngOnInit() {
    this.myForm = new FormGroup({
          task: new FormControl('', [Validators.required] ),
          parentTask: new FormControl('', Validators.required),
          priority: new FormControl('', Validators.required),
          startDate: new FormControl('',Validators.required),
          endDate: new FormControl('',Validators.required)
      })  

  }

  onSelect(item: any) {
    this.selectedItem = item;
  }
 
  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  search () {
    let task = this.myForm.get('task').value.trim(); 
    if(task!=""){
      this.workOutService.searchParentTasks(task).debounceTime(400).distinctUntilChanged().
    subscribe(response => this.results = response);
    }
    else{
      response=>"Records not found";
    }
  }

  onSubmit() {
	  if (this.myForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
    let id=0;
	  let task = this.myForm.get('task').value.trim();
    let parentTask = this.myForm.get('parentTask').value.trim();
    let priority = this.myForm.get('priority').value;	 
    let startDate= this.myForm.get('startDate') .value;
    let endDate= this.myForm.get('endDate') .value;
    let endTask=false;
	    
      let workOut= new WorkOut(id,task,parentTask,priority,startDate,
      endDate,endTask);	  
	    this.workOutService.addWorkOut(workOut)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      
			},
            errorCode => this.statusCode = errorCode);     
   }

   resetForm(){
    this.myForm.controls['task'].setValue(null);
    this.myForm.controls['parentTask'].setValue(null);
    this.myForm.controls['priority'].setValue(null);
    this.myForm.controls['startDate'].setValue(null);
    this.myForm.controls['endDate'].setValue(null);
   }
    
   ngAfterViewChecked(): void {
     webGlObject.init();
  }



}
