package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/lecturers")
public class LecturerController {

    private final LecturerRepository lecturerRepository;

    @Autowired
    public LecturerController(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    @GetMapping
    public List<Lecturer> getAllLecturers(){
    	return lecturerRepository.findAll();
    }
    
    @PostMapping
    public Lecturer addLecturer(@RequestBody Lecturer lecturer) {
    	return lecturerRepository.save(lecturer);
    }
 
}

