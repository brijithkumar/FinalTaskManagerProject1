package com.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.taskmanager.entities.Task;


@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{
	
	@Modifying
	@Query("update Task t set t.endTask=true where t.parentTask.id=:id")
	void endTask(@Param("id") int id);

}
