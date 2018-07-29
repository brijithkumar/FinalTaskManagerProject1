import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { WorkOutService } from './work-out.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { getAllTasks } from 'src/app/unittest/unitTests-task';

const WORKOUTS=getAllTasks();

describe('WorkOutService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let workOutService: WorkOutService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        HttpModule
      ],
      providers: [WorkOutService]
    });
    httpClient=TestBed.get(HttpClient);
    httpTestingController=TestBed.get(HttpTestingController);
    workOutService=TestBed.get(WorkOutService);

  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', inject([WorkOutService], (service: WorkOutService) => {
    expect(service).toBeTruthy();
  }));

  describe('#searchParentTasks', () => {
    let expectedTasks: String[];
    let tasksUrl: any;

    beforeEach(() => {
      workOutService = TestBed.get(WorkOutService);
      tasksUrl = workOutService.baseUrl + 'getParentTaskNames'
      expectedTasks =
        [
          'JUMP','WALK','RUN'
        ] as String[];
    });

    it('should return expected parent tasks (called once)', () => {
      workOutService.searchParentTasks('WALK').subscribe(
        tasks => expect(tasks).toEqual(expectedTasks, 'should return expected parent tasks'),
        fail
      );
    });
 
  });

});
