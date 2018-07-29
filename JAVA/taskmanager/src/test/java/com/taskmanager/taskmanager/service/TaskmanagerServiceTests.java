package com.taskmanager.taskmanager.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.taskmanager.entities.ParentTask;
import com.taskmanager.entities.Task;
import com.taskmanager.repository.ParentTaskRepository;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.services.TaskmanagerServiceImpl;
import com.taskmanager.ui.WorkOut;
import com.taskmanager.utility.TaskManagerUtility;

@RunWith(SpringJUnit4ClassRunner.class)
public class TaskmanagerServiceTests {
	
	@Mock
	ParentTaskRepository parentTaskRepository;
	@Mock
	TaskRepository taskRepository;
	
	@InjectMocks
	TaskmanagerServiceImpl taskmanagerServiceImpl;
	
	WorkOut workOut1=new WorkOut();
	WorkOut workOut2=new WorkOut();
	
	@Before()
	public void setup(){
		MockitoAnnotations.initMocks(this);
		createFirstMockTask();
		createSecondMockTask();
	}
	
	
	private void createFirstMockTask() {
		workOut1.setPriority(5);
		workOut1.setStartDate("30-03-2008");
		workOut1.setEndDate("30-03-2009");
		workOut1.setEndTask(false);
		workOut1.setTask("TEST TASK1");
		workOut1.setParentTask("PARENT TASK1");
	}
	private void createSecondMockTask() {
		workOut2.setPriority(3);
		workOut2.setStartDate("30-03-2009");
		workOut2.setEndDate("30-03-2010");
		workOut2.setEndTask(false);
		workOut2.setTask("TEST TASK2");
		workOut2.setParentTask("PARENT TASK2");
	}
	
	

	@Test
	public void testSaveTask() {
		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		Mockito.when(parentTaskRepository.save(parentTask1)).thenReturn(parentTask1);
		ParentTask task=taskmanagerServiceImpl.saveTaskDetails(workOut1);
		assertEquals("PARENT TASK1",task.getName());
	}
	
	@Test
	public  void testgetAllWorkOuts() {
		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		ParentTask parentTask2=TaskManagerUtility.copyUIObjectToEntity(workOut2);
		when(parentTaskRepository.findAll()).thenReturn(Arrays.asList(parentTask1, parentTask2));
		List<WorkOut> tasks = taskmanagerServiceImpl.getAllWorkOuts();
		assertEquals(2, tasks.size());
	}

	
	@Test
	public  void testupdateTaskDetails() {
		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		Mockito.when(taskmanagerServiceImpl.getTaskDetailsById(Mockito.eq(workOut1.getId()))).thenReturn(Optional.of(parentTask1));
		Mockito.when(parentTaskRepository.save(Optional.of(parentTask1).get())).thenReturn(Optional.of(parentTask1).get());
		taskmanagerServiceImpl.updateTaskDetails(workOut1);
		assertEquals("PARENT TASK1",Optional.of(parentTask1).get().getName());
		assertEquals("TEST TASK1",workOut1.getTask());
	}
	//deleteTaskDetails
	
	@Test
	public  void testDelete() {
		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		Mockito.when(taskmanagerServiceImpl.getTaskDetailsById(Mockito.eq(workOut1.getId()))).thenReturn(Optional.of(parentTask1));
		//Mockito.when(parentTaskRepository.delete(Optional.of(parentTask1).get())).thenReturn();
		taskmanagerServiceImpl.deleteTaskDetails(workOut1.getId());
		verify(parentTaskRepository, atLeastOnce()).delete(Optional.of(parentTask1).get());

	}
	
	@Test
	public  void testGetParentTaskNames() {
		Task task1=new Task();
		Task task2=new Task();
		task1.setName("JUMP");
		task2.setName("JUMPPPP");
		when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));
		List<String> parentTaskNames = taskmanagerServiceImpl.getParentTaskNames("JUMP");
		assertEquals(1, parentTaskNames.size());
	}
	
	@Test
	public  void testEndTask() {
		taskmanagerServiceImpl.endTask(workOut1.getId());
		verify(taskRepository,atLeastOnce()).endTask(workOut1.getId());
	}
	
	
}
