package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("students")
public class StudentController {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository; // Inject the repository via the constructor
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable long id) {
    	return studentRepository.findById(id).get();
    }
    
    @GetMapping("/get/{userName}")
    public List<Student> getStudentsByUserName(@PathVariable String userName){
    	List<Student> students = studentRepository.findByUserName(userName);
    	return students;
    }
    
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable long id, @RequestBody Student student) {
    	Student updateStudent = studentRepository.findById(id).get();
    	updateStudent.setStudentUserName(student.getUserName());
    	return studentRepository.save(updateStudent);
    	
    }
    
    @DeleteMapping("/{id}")
    public String deleteStudentById(@PathVariable long id) {
    	studentRepository.deleteById(id);
    	return "Delete Successfully";
    }
}

