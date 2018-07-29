package com.taskmanager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmanager.entities.ParentTask;
import com.taskmanager.entities.Task;
import com.taskmanager.repository.ParentTaskRepository;
import com.taskmanager.services.TaskManagerService;
import com.taskmanager.ui.WorkOut;
import com.taskmanager.utility.TaskManagerUtility;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class TaskManagerController {
	
	@Autowired
	TaskManagerService taskManagerService;
	
	@Autowired
	ParentTaskRepository parentTaskRepository;
	
	/**
	 * Method will save the task details
	 * @param workOut
	 * @param builder
	 * @return
	 */
	@RequestMapping(value="/saveTaskDetails", method=RequestMethod.POST)
	public ResponseEntity<Void> saveTaskDetails(@RequestBody WorkOut workOut, UriComponentsBuilder builder) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			String jsonInString = mapper.writeValueAsString(workOut);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ParentTask parentTask=taskManagerService.saveTaskDetails(workOut);
		HttpHeaders headers = new HttpHeaders();
		//headers.setLocation(builder.path("/?id={id}").buildAndExpand(parentTask.getId()).toUri());///api/task/{id}
		headers.setLocation(builder.path("/api/{id}").buildAndExpand(parentTask.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	
	/**
	 * Method will return all work outs present in the DB
	 * @return
	 */
	@GetMapping(value="/getTaskDetails")
	public ResponseEntity<List<WorkOut>> getAllWorkOuts() {
		List<WorkOut> list = taskManagerService.getAllWorkOuts();
		return new ResponseEntity<List<WorkOut>>(list, HttpStatus.OK);
	}
	
	/**
	 * Update the existing work out
	 * @param workOut
	 * @return
	 */
	@PutMapping(value="/updateTaskDetails")
	public ResponseEntity<WorkOut> updateTaskDetails(@RequestBody WorkOut workOut) {
		taskManagerService.updateTaskDetails(workOut);
		return new ResponseEntity<WorkOut>(workOut, HttpStatus.OK);
	}
	
	/**
	 * delete the existing work out
	 * @param id
	 * @return
	 */
	@DeleteMapping(value="/deleteTaskDetails/{id}")
	public ResponseEntity<Void> deleteArticle(@PathVariable String id) {
		taskManagerService.deleteTaskDetails(Integer.parseInt(id));
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	/**
	 * Fetch all the task names for parent task auto complete component 
	 * @param workOut
	 * @return
	 */
	@RequestMapping(value="/getParentTaskNames")
	public ResponseEntity<List<String>> getParentTaskNames(@RequestBody String workOut) {
		List<String> parentTaskNames=taskManagerService.getParentTaskNames(workOut);
		return new ResponseEntity<List<String>>(parentTaskNames, HttpStatus.OK);
	}
	
	/**
	 * End the task by setting the status in DB
	 * @param id
	 * @param builder
	 * @return
	 */
	@PutMapping(value="/endTask")
	public ResponseEntity<String> endTask(@RequestBody String id, UriComponentsBuilder builder) {
		taskManagerService.endTask(Integer.parseInt(id));
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	


}
