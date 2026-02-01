package com.solartrack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="installer")
public class Installer {
	
	@Id
	private Long contactId;
	private String name;
    private String email;
    private String password;
    
    @Column(unique=true)
    private String licenseNo;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLicenseNo() {
		return licenseNo;
	}

	public void setLicenseNo(String licenseNo) {
		this.licenseNo = licenseNo;
	}

	@Override
	public String toString() {
		return "Installer [contactId=" + contactId + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", licenseNo=" + licenseNo + "]";
	}
    
	
}
