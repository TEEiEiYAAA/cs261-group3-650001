package com.example.crud; // Make sure to specify your package

import com.example.crud.Student; // Import your Student entity
import org.springframework.data.jpa.repository.JpaRepository; // Import JpaRepository
import org.springframework.stereotype.Repository; // Import Repository annotation
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
  
	//save(Student student);
	//findById(Long id);
	//findAll();
	//deleteById(Long id);
	List<Student> findByUserName(String userName);
}
