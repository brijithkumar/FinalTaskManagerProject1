package com.taskmanager.utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.taskmanager.entities.ParentTask;
import com.taskmanager.entities.Task;
import com.taskmanager.ui.WorkOut;

public class TaskManagerUtility {
	
	private static final DateFormat sourceFormat = new SimpleDateFormat("dd-MM-yyyy");
	
public static Date stringtoDateConverter(String dateAsString) {
	Date date = null;
	try {
		date = sourceFormat.parse(dateAsString);
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return date;
}

public static String dateToStringConverter(Date date) {
	String dateAsString = null;
	dateAsString = sourceFormat.format(date);
	return dateAsString;
}

public static ParentTask copyUIObjectToEntity(WorkOut workOut) {
	ParentTask parentTask=new ParentTask();
	parentTask.setName(workOut.getParentTask().toUpperCase());
	Task task=new Task();
	task.setName(workOut.getTask().toUpperCase());
	task.setPriority(workOut.getPriority());
	task.setStartDate(stringtoDateConverter(workOut.getStartDate()));
	task.setEndDate(stringtoDateConverter(workOut.getEndDate()));
	task.setEndTask(workOut.isEndTask());
	task.setParentTask(parentTask);
	parentTask.getTasks().add(task);
	return parentTask;
	
}

public static void copyEntityToUiObject(List<WorkOut> workOuts, List<ParentTask> taskEntities) {
	for(ParentTask parentTask:taskEntities) {
		WorkOut workOut=new WorkOut();
		workOut.setId(parentTask.getId());
		workOut.setParentTask(parentTask.getName());
		for(Task task:parentTask.getTasks()) {
			workOut.setTask(task.getName());
			workOut.setPriority(task.getPriority());
			workOut.setStartDate(dateToStringConverter(task.getStartDate()));
			workOut.setEndDate(dateToStringConverter(task.getEndDate()));
			workOut.setEndTask(task.isEndTask());
			workOuts.add(workOut);
		}
		
	}
}

}
