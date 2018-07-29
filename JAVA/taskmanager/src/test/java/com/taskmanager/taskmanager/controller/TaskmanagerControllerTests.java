package com.taskmanager.taskmanager.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.taskmanager.controller.TaskManagerController;
import com.taskmanager.entities.ParentTask;
import com.taskmanager.repository.ParentTaskRepository;
import com.taskmanager.services.TaskManagerService;
import com.taskmanager.ui.WorkOut;
import com.taskmanager.utility.TaskManagerUtility;

@RunWith(SpringRunner.class)
@WebMvcTest(value = TaskManagerController.class, secure = false)
public class TaskmanagerControllerTests {
	
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private TaskManagerService taskManagerService;
	@MockBean
	ParentTaskRepository parentTaskRepository;
	
	WorkOut workOut1=new WorkOut();
	WorkOut workOut2=new WorkOut();
	
	@Before()
	public void setup(){
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
		workOut1.setId(2);
	}
	private void createSecondMockTask() {
		workOut2.setPriority(3);
		workOut2.setStartDate("30-03-2009");
		workOut2.setEndDate("30-03-2010");
		workOut2.setEndTask(false);
		workOut2.setTask("TEST TASK2");
		workOut2.setParentTask("PARENT TASK2");
		workOut2.setId(3);
	}
	
	private String sampleInput="{\"id\":0,\"task\":\"cricket\",\"parentTask\":\"JUMPING\",\"priority\":17,\"startDate\":\"12-05-2016\",\"endDate\":\"12-06-2018\",\"endTask\":false}";

	@Test
	public void getAllWorkOuts() {
		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		ParentTask parentTask2=TaskManagerUtility.copyUIObjectToEntity(workOut2);
		when(parentTaskRepository.findAll()).thenReturn(Arrays.asList(parentTask1,parentTask2));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/getTaskDetails").accept(MediaType.APPLICATION_JSON);
		try {
			mockMvc.perform(requestBuilder).andReturn();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		verify(taskManagerService, atLeastOnce()).getAllWorkOuts();
		
	}
	
	@Test
	public void testSaveTaskDetails() throws Exception {

		ParentTask parentTask1=TaskManagerUtility.copyUIObjectToEntity(workOut1);
		parentTask1.setId(workOut1.getId());
		when(taskManagerService.saveTaskDetails(Mockito.any(WorkOut.class))).thenReturn(parentTask1);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/saveTaskDetails")
				.accept(MediaType.APPLICATION_JSON).content(sampleInput).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals("http://localhost/api/2", response.getHeader(HttpHeaders.LOCATION));
	}
	
	@Test
	public void testUpdateTaskDetails() throws Exception {
		Mockito.doNothing().when(taskManagerService).updateTaskDetails(Mockito.any(WorkOut.class));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/updateTaskDetails")
				.accept(MediaType.APPLICATION_JSON).content(sampleInput).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals(HttpStatus.OK.value(), response.getStatus());
	}
	

	@Test
	public void testDeleteTaskDetails() throws Exception {
		Mockito.doNothing().when(taskManagerService).deleteTaskDetails(Mockito.eq(2));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/deleteTaskDetails/2").accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
	}
	
	@Test
	public void testGetParentTaskNames() {
		String inputName="JUMP";
		when(taskManagerService.getParentTaskNames(Mockito.any(String.class))).thenReturn(Arrays.asList("JUMP","JUMPPP"));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/getParentTaskNames")
				.accept(MediaType.APPLICATION_JSON).content(inputName).contentType(MediaType.APPLICATION_JSON);
		try {
			mockMvc.perform(requestBuilder).andReturn();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		verify(taskManagerService, atLeastOnce()).getParentTaskNames("JUMP");
	}
	
	@Test
	public void testEndTask() throws Exception {
		Mockito.doNothing().when(taskManagerService).endTask(Mockito.eq(2));
		//RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/endTask/2").accept(MediaType.APPLICATION_JSON);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/endTask")
				.accept(MediaType.APPLICATION_JSON).content("2").contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		MockHttpServletResponse response = result.getResponse();
		assertEquals(HttpStatus.OK.value(), response.getStatus());
	}
	
	

}
