package com.taskmanager.services;

import java.util.List;
import java.util.Optional;

import com.taskmanager.entities.ParentTask;
import com.taskmanager.ui.WorkOut;

public interface TaskManagerService {

	ParentTask saveTaskDetails(WorkOut workOut);

	List<WorkOut> getAllWorkOuts();

	void updateTaskDetails(WorkOut workOut);

	Optional<ParentTask> getTaskDetailsById(int workOutId);

	void deleteTaskDetails(int parseInt);

	List<String> getParentTaskNames(String name);

	void endTask(int workoutId);
}
