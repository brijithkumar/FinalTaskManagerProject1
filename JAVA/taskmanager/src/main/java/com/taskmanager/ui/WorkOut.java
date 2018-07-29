package com.taskmanager.ui;

public class WorkOut {

	public int id;
	public String task;
	public String parentTask;
	public int priority;
	public String startDate;
	public String endDate;
	public boolean endTask;
	
	public boolean isEndTask() {
		return endTask;
	}
	public void setEndTask(boolean endTask) {
		this.endTask = endTask;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getParentTask() {
		return parentTask;
	}
	public void setParentTask(String parentTask) {
		this.parentTask = parentTask;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	

	
}
