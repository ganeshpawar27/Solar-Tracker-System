package com.solartrack.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.solartrack.model.InstallationRequest;
import com.solartrack.model.Installer;
import com.solartrack.service.RequestService;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "https://solar-tracker-frontend.onrender.com")
public class RequestController {
	@Autowired
	 private RequestService requestService;
	
	@PostMapping("/apply")
    public InstallationRequest apply(@RequestBody InstallationRequest request) {
        return requestService.applyForSolar(request);
    }

	@PutMapping("/assign/{id}")
    public ResponseEntity<InstallationRequest> assign(
            @PathVariable Long id, 
            @RequestParam Long installerId) {
        
        InstallationRequest updated = requestService.assignInstaller(id, installerId);
        return ResponseEntity.ok(updated);
    }
	
	@GetMapping("/all")
	public List<InstallationRequest> allRequest() {
        return requestService.getAllRequests();
    }
	@GetMapping("/{id}")
	public InstallationRequest singleRequest(@PathVariable Long id) {
        return requestService.getRequest(id);
    }
	
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return "Installation Request Deleted successfully";
    }
	@GetMapping("/resident/{residentId}")
	public List<InstallationRequest> getByResident(@PathVariable Long residentId) {
	    return requestService.getRequestsByResidentId(residentId);
	}
	@GetMapping("/installer/{installerId}")
	public List<InstallationRequest> getByInstaller(@PathVariable Long installerId) {
	    return requestService.getRequestByInstallerId(installerId);
	}
	
	@GetMapping("/pending")
    public ResponseEntity<List<InstallationRequest>> getPendingRequests() {
        return ResponseEntity.ok(requestService.getPendingRequests());
    }
	
	@GetMapping("/approved")
	public ResponseEntity<List<InstallationRequest>> getApprovedRequest(){
		return ResponseEntity.ok(requestService.getApprovedRequests());
	}
	@GetMapping("/completed")
	public ResponseEntity<List<InstallationRequest>> getCompletedRequest(){
		return ResponseEntity.ok(requestService.getCompletedRequests());
	}
	
	@PutMapping("/status/{id}")
    public ResponseEntity<InstallationRequest> updateRequestStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        
		InstallationRequest updatedRequest = requestService.updateStatus(id, status);
        return ResponseEntity.ok(updatedRequest);
    }
	
	

}
