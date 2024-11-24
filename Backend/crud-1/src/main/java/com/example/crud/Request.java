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
@Table(name="requests")
public class Request {
	
	/*pk id
	//fk (studentUserName), (lecturerUserName)
	//status, dateTime,
	//subject, to, name, studentid, academicyear, department, address,
	//district, region, province
	
	//requesttopic
	
	//common-fields
	//semester, subjectid, subjectname, section
	
	//resignation-fields
	//resignsemester, resignyear, nodebt, debt, debtamount
	
	//other-fields
	//other
	
	//reason*/

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)                                                     
	private Long id ; 
	
	@Column(name = "student_username", nullable = false)
	private String studentUserName; 
	
	@Column(name = "lecturer_username", nullable = false)
	private String lecturerUserName ;
	
	@Column(name = "status", nullable = false)
	private String status ;
	
	@Column(name = "date_time", nullable = false)
	private String  dateTime;
	
	@Column(name = "subject", nullable = false)
	private String  subject;
	
	@Column(name = "recipient", nullable = false)
	private String  recipient;
	
	@Column(name = "name", nullable = false)
	private String  name;
	
	@Column(name = "student_id", nullable = false)
	private String  studentId;
	
	@Column(name = "academic_year", nullable = false)
	private String  academicYear;
	
	@Column(name = "department", nullable = false)
	private String  department;
	
	@Column(name = "address", nullable = false)
	private String  address;
	
	@Column(name = "district", nullable = false)
	private String  district;
	
	@Column(name = "region", nullable = false)
	private String  region;
	
	@Column(name = "province", nullable = false)
	private String  province;
	
	@Column(name = "request_value", nullable = true)
	private String  requestValue;
	
	@Column(name = "request_topic", nullable = false)
	private String  requestTopic;
	
	@Column(name = "semester", nullable = true)
	private String  semester;
	
	@Column(name = "subject_id", nullable = true)
	private String  subjectId;
	
	@Column(name = "subject_name", nullable = true)
	private String  subjectName;
	
	@Column(name = "section", nullable = true)
	private String  section;
	
	@Column(name = "resign_semester", nullable = true)
	private String  resignSemester;
	
	@Column(name = "resign_year", nullable = true)
	private String  resignYear;
	
	@Column(name = "no_debt", nullable = true)
	private String  noDebt;
	
	@Column(name = "debt", nullable = true)
	private String  debt;
	
	@Column(name = "debt_amount", nullable = true)
	private String  debtAmount;
	
	@Column(name = "other", nullable = true)
	private String  other;
	
	@Column(name = "reason", nullable = false)
	private String  reason;
	
	@Column(name = "lecturer_comment", nullable = true)
	private String lecturerReason;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStudentUserName() {
		return studentUserName;
	}

	public void setStudentUserName(String studentUserName) {
		this.studentUserName = studentUserName;
	}

	public String getLecturerUserName() {
		return lecturerUserName;
	}

	public void setLecturerUserName(String lecturerUserName) {
		this.lecturerUserName = lecturerUserName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getAcademicYear() {
		return academicYear;
	}

	public void setAcademicYear(String academicYear) {
		this.academicYear = academicYear;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getRequestTopic() {
		return requestTopic;
	}

	public void setRequestTopic(String requestTopic) {
		this.requestTopic = requestTopic;
	}
	
	public String getRequestValue() {
		return requestValue;
	}
	
	public void setRequestValue(String requestValue) {
		this.requestValue = requestValue;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	public String getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(String subjectId) {
		this.subjectId = subjectId;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getResignSemester() {
		return resignSemester;
	}

	public void setResignSemester(String resignSemester) {
		this.resignSemester = resignSemester;
	}

	public String getResignYear() {
		return resignYear;
	}

	public void setResignYear(String resignYear) {
		this.resignYear = resignYear;
	}

	public String getNoDebt() {
		return noDebt;
	}

	public void setNoDebt(String noDebt) {
		this.noDebt = noDebt;
	}

	public String getDebt() {
		return debt;
	}

	public void setDebt(String debt) {
		this.debt = debt;
	}

	public String getDebtAmount() {
		return debtAmount;
	}

	public void setDebtAmount(String debtAmount) {
		this.debtAmount = debtAmount;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
	
	public String getLecturerReason() {
		return lecturerReason;
	}
	
	public void setLecturerReason(String lecturerReason) {
		this.lecturerReason = lecturerReason;
	}
	
	
	
}

