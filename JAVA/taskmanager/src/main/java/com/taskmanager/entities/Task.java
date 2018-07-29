package com.taskmanager.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Task{
	
    private int id;
    private String name;
    private int priority;
    private Date startDate;
    private Date endDate;
    private boolean endTask;
    
    
    
    private ParentTask parentTask;

    public Task() {

    }

    public Task(String name) {
        this.name = name;
    }

    public Task(String name, ParentTask parentTask) {
        this.name = name;
        this.parentTask = parentTask;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="task_id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="task")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name="priority")
	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	@Column(name="start_date")
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Column(name="end_date")
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@ManyToOne
    @JoinColumn(name = "parent_id")
	public ParentTask getParentTask() {
		return parentTask;
	}

	public void setParentTask(ParentTask parentTask) {
		this.parentTask = parentTask;
	}

	@Column(name="end_task")
	public boolean isEndTask() {
		return endTask;
	}

	public void setEndTask(boolean endTask) {
		this.endTask = endTask;
	}
    
    
}
