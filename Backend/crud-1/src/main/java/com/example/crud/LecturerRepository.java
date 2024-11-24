package com.example.crud; // Make sure to specify your package

import com.example.crud.Student; // Import your Student entity
import org.springframework.data.jpa.repository.JpaRepository; // Import JpaRepository
import org.springframework.stereotype.Repository; // Import Repository annotation

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
  
	//save(Student student);
	//findById(Long id);
	//findAll();
	//deleteById(Long id);
}
