import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {WorkOut} from '../../entities/workout';
import {WorkOutService} from '../../services/work-out.service';
import {Router} from '@angular/router';
import { Input } from '@angular/core';

declare var webGlObject: any;

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.component.html',
  styleUrls: ['./update-workout.component.css']
})
export class UpdateWorkoutComponent implements OnInit {
  myupdateForm:FormGroup;
  message:string;
  submitted = false;
  statusCode: number;
  workOut:WorkOut;
  results: any[] = [];
  selectedItem: any = '';
  inputChanged: any = ''
  @Input()
  parentTaskModel:string;

  constructor(private workOutService:WorkOutService,
    private router:Router) { }

    ngOnInit() {
      this.workOut=this.workOutService.getCurrentTaskDetails();
      this.myupdateForm = new FormGroup({
            task: new FormControl('', [Validators.required] ),
            parentTask: new FormControl('', Validators.required),
            priority: new FormControl('', Validators.required),
            startDate: new FormControl('',Validators.required),
            endDate: new FormControl('',Validators.required)
        })  
        if(this.workOut!=null && this.workOut.id!=null) {
          this.myupdateForm.controls['task'].setValue(this.workOut.task);
          this.myupdateForm.controls['parentTask'].setValue(this.workOut.parentTask);
          this.myupdateForm.controls['priority'].setValue(this.workOut.priority);
          this.myupdateForm.controls['startDate'].setValue(this.workOut.startDate);
          this.myupdateForm.controls['endDate'].setValue(this.workOut.endDate);
          this.parentTaskModel=this.workOut.parentTask;
        }
    this.myupdateForm.statusChanges.subscribe((data: any) => console.log(data));
    }

    onSubmit() {
	   
      if (this.myupdateForm.invalid) {
           return; //Validation failed, exit from method.
      }   
      let id=this.workOut.id;
      let task = this.myupdateForm.get('task').value.trim();
      let parentTask = this.myupdateForm.get('parentTask').value.trim();
      let priority = this.myupdateForm.get('priority').value;	 
      let startDate= this.myupdateForm.get('startDate') .value;
      let endDate= this.myupdateForm.get('endDate') .value;
      let endTask=false;
      let workOut= new WorkOut(id,task,parentTask,priority,startDate,
        endDate,endTask);	  
        this.workOutService.updateTaskDetails(workOut)
          .subscribe(successCode => {
                    this.statusCode = successCode;
              
        },
              errorCode => this.statusCode = errorCode);     
      }

      onCancel(){
        this.myupdateForm.controls['task'].setValue(this.workOut.task);
        this.myupdateForm.controls['parentTask'].setValue(this.workOut.parentTask);
        this.myupdateForm.controls['priority'].setValue(this.workOut.priority);
        this.myupdateForm.controls['startDate'].setValue(this.workOut.startDate);
        this.myupdateForm.controls['endDate'].setValue(this.workOut.endDate);
      }

      search () {
        let task = this.myupdateForm.get('task').value.trim(); 
        if(task!=""){
          this.workOutService.searchParentTasks(task).debounceTime(400).distinctUntilChanged().
        subscribe(response => this.results = response);
        }
        else{
          response=>"Records not found";
        }
      }

      onSelect(item: any) {
        this.selectedItem = item;
      }
     
      onInputChangedEvent(val: string) {
        this.inputChanged = val;
      }

      ngAfterViewChecked(): void {
        webGlObject.init();
     }


}
