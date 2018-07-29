import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  constructor() { }

  @Input('task') task:string;
  @Input('parentTask') parentTask:string;

  ngOnInit() {
  }

}
