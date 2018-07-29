package com.taskmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanager.entities.ParentTask;
import com.taskmanager.entities.Task;
import com.taskmanager.repository.ParentTaskRepository;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.ui.WorkOut;
import com.taskmanager.utility.TaskManagerUtility;

@Service
public class TaskmanagerServiceImpl implements TaskManagerService{

	@Autowired
	ParentTaskRepository parentTaskRepository;
	@Autowired
	TaskRepository taskRepository;
	
	@Override
	public ParentTask saveTaskDetails(WorkOut workOut) {
		ParentTask parentTask=TaskManagerUtility.copyUIObjectToEntity(workOut);
		parentTaskRepository.save(parentTask);
		return parentTask;
	}

	@Override
	public List<WorkOut> getAllWorkOuts() {
		// TODO Auto-generated method stub
		List<WorkOut> workOuts=new ArrayList<>();
		List<ParentTask> taskEntities=parentTaskRepository.findAll();
		TaskManagerUtility.copyEntityToUiObject(workOuts, taskEntities);
		return workOuts;
	}

	@Override
	public void updateTaskDetails(WorkOut workOut) {
		// TODO Auto-generated method stub
		Optional<ParentTask> parenttaskObj=getTaskDetailsById(workOut.getId());
		if(parenttaskObj.isPresent()){
			parenttaskObj.get().setName(workOut.getParentTask().toUpperCase());
			for(Task task:parenttaskObj.get().getTasks()){
				task.setName(workOut.getTask().toUpperCase());
				task.setPriority(workOut.getPriority());
				task.setStartDate(TaskManagerUtility.stringtoDateConverter(workOut.getStartDate()));
				task.setEndDate(TaskManagerUtility.stringtoDateConverter(workOut.getEndDate()));
				task.setParentTask(parenttaskObj.get());
			}
		}
		parentTaskRepository.save(parenttaskObj.get());
	}

	@Override
	public Optional<ParentTask> getTaskDetailsById(int workOutId) {
		// TODO Auto-generated method stub
		return parentTaskRepository.findById(workOutId);
	}

	@Override
	public void deleteTaskDetails(int parentTaskId) {
		// TODO Auto-generated method stub
		Optional<ParentTask> parenttaskObj=getTaskDetailsById(parentTaskId);
		if(parenttaskObj.isPresent()){
			parentTaskRepository.delete(parenttaskObj.get());
		}
	}

	@Override
	public List<String> getParentTaskNames(String name) {
		List<String> parentNames= new ArrayList<String>();
		List<Task> tasks=taskRepository.findAll();
		for(Task task:tasks){
			if(!task.getName().equalsIgnoreCase(name) && !parentNames.contains(task.getName())){
				parentNames.add(task.getName());
			}
		}
		return parentNames;
	}

	@Override
	@Transactional
	public void endTask(int workoutId) {
		taskRepository.endTask(workoutId);
	}




}
