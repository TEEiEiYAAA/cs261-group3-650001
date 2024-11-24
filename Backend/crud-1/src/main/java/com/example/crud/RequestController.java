package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/requests")
public class RequestController {
	
	private final RequestRepository requestRepository;
	
	@Autowired
	public RequestController(RequestRepository requestRepository) {
		this.requestRepository = requestRepository;
	}
	
	@GetMapping
	public List<Request> getAllRequests(){
		return requestRepository.findAll();
	}
	
	@GetMapping("/id/{id}")
	public Request getRequestById(@PathVariable long id) {
		return requestRepository.findById(id).get();
	}
	
	@GetMapping("/studentUserName/{studentUserName}")
	public List<Request> getRequestsByStudentUserName(@PathVariable String studentUserName){
		List<Request> requests = requestRepository.findByStudentUserName(studentUserName);
		 return requests;
	}
	
	@GetMapping("/lecturerUserName/{lecturerUserName}")
	public List<Request> getRequestByLecturerUserName(@PathVariable String lecturerUserName){
		List<Request> requests = requestRepository.findByLecturerUserName(lecturerUserName);
		return requests;
	}
	
	@PostMapping
	public Request addRequest(@RequestBody Request request) {
		return requestRepository.save(request);
	}
	
	@DeleteMapping("/{id}")
	public void deleteRequest(@PathVariable long id) {
		 requestRepository.deleteById(id);
	}
	
	@PutMapping("/{id}")
	public Request updateRequest(@PathVariable long id, @RequestBody Request request) {
		Request updateRequest = requestRepository.findById(id).get();
		updateRequest.setStudentUserName(request.getStudentUserName());
		updateRequest.setLecturerUserName(request.getLecturerUserName());
		updateRequest.setStatus(request.getStatus());
		updateRequest.setDateTime(request.getDateTime());
		updateRequest.setSubject(request.getSubject());
		updateRequest.setRecipient(request.getRecipient());
		updateRequest.setName(request.getName());
		updateRequest.setStudentId(request.getStudentId());
		updateRequest.setAcademicYear(request.getAcademicYear());
		updateRequest.setDepartment(request.getDepartment());
		updateRequest.setAddress(request.getAddress());
		updateRequest.setDistrict(request.getDistrict());
		updateRequest.setRegion(request.getRegion());
		updateRequest.setProvince(request.getProvince());
		updateRequest.setRequestValue(request.getRequestValue());
		updateRequest.setRequestTopic(request.getRequestTopic());
		updateRequest.setSemester(request.getSemester());
		updateRequest.setSubjectId(request.getSubjectId());
		updateRequest.setSubjectName(request.getSubjectName());
		updateRequest.setSection(request.getSection());
		updateRequest.setResignSemester(request.getResignSemester());
		updateRequest.setResignYear(request.getResignYear());
		updateRequest.setNoDebt(request.getNoDebt());
		updateRequest.setDebt(request.getDebt());
		updateRequest.setDebtAmount(request.getDebtAmount());
		updateRequest.setOther(request.getOther());
		updateRequest.setReason(request.getReason());
		updateRequest.setLecturerReason(request.getLecturerReason());
		
		return requestRepository.save(updateRequest);
		
		
	}
	
	
	
	
	

   
}


