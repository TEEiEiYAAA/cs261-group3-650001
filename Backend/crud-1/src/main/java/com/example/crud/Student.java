package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name="students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	
	@Column(name = "user_name", nullable = false)
	private String userName; 
	
	@Column(name = "type", nullable = false)
	private String type ;
	
	@Column(name = "eng_name", nullable = false)
	private String displayname_en ;
	
	@Column(name = "email", nullable = false)
	private String  email;
	
	@Column(name = "faculty", nullable = false)
	private String  faculty;
	
	public String getUserName() {
		return userName;
	}
	
	public void setStudentUserName(String userName) {
		this.userName = userName;
	}
	
}
