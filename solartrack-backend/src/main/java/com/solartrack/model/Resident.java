package com.solartrack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import lombok.*;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor

@Table(name="resident")


public class Resident {
	@Id
	private Long contactId;
	private String name;
	private String address;
	
	@Column(unique=true)
	private String email;
	private String aadhaar;
	private String password;
	
	public Long getContactId() {
		return contactId;
	}
	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAadhaar() {
		return aadhaar;
	}
	public void setAadhaar(String aadhaar) {
		this.aadhaar = aadhaar;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "Resident [contactId=" + contactId + ", name=" + name + ", address=" + address + ", email=" + email
				+ ", aadhaar=" + aadhaar + ", password=" + password + "]";
	}
	public Resident(Long contactId, String name, String address, String email, String aadhaar, String password) {
		super();
		this.contactId = contactId;
		this.name = name;
		this.address = address;
		this.email = email;
		this.aadhaar = aadhaar;
		this.password = password;
	}
	public Resident() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
