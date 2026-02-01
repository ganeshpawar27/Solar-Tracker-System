package com.solartrack.model;

import jakarta.persistence.*;
import java.time.LocalDate;


@Entity

@Table(name = "installation_requests")
public class InstallationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AI: Auto-Increment
    private Long id;

    // This links the request to a Resident
    @ManyToOne
    @JoinColumn(name = "resident_id")  //its mapped to contactId of resident
    private Resident resident;

    private String systemType; // e.g., On-grid, Off-grid
    private Double capacityKW;
    private LocalDate requestDate;
    private String status; // Pending, Approved, Rejected
    
    @ManyToOne
    @JoinColumn(name = "installer_id")
    private Installer installer;
    
	public Long getId() {
		return id;
	}
	public Installer getInstaller() {
		return installer;
	}
	public void setInstaller(Installer installer) {
		this.installer = installer;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Resident getResident() {
		return resident;
	}
	public void setResident(Resident resident) {
		this.resident = resident;
	}
	public String getSystemType() {
		return systemType;
	}
	public void setSystemType(String systemType) {
		this.systemType = systemType;
	}
	public Double getCapacityKW() {
		return capacityKW;
	}
	public void setCapacityKW(Double capacityKW) {
		this.capacityKW = capacityKW;
	}
	public LocalDate getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(LocalDate requestDate) {
		this.requestDate = requestDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "InstallationRequest [id=" + id + ", resident=" + resident + ", systemType=" + systemType
				+ ", capacityKW=" + capacityKW + ", requestDate=" + requestDate + ", status=" + status + "]";
	}
	
    
    
    
    
    
}