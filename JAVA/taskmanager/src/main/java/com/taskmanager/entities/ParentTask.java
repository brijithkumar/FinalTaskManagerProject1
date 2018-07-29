package com.taskmanager.entities;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "parent_task")
public class ParentTask {
    private int id;
    private String name;
    private Set<Task> tasks=new HashSet<>();

    public ParentTask(){

    }

    public ParentTask(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="parent_id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="parent_task")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "parentTask", cascade = CascadeType.ALL)
    public Set<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}

	@Override
    public String toString() {
        String result = String.format(
                "Parent Task[id=%d, name='%s']%n",
                id, name);
        if (tasks != null) {
            for(Task task : tasks) {
                result += String.format(
                        "Task[id=%d, name='%s']%n",
                        task.getId(), task.getName());
            }
        }

        return result;
    }
}
