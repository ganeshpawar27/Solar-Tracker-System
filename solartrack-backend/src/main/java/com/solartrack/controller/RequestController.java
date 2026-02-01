package com.solartrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solartrack.model.InstallationRequest;
import com.solartrack.model.Installer;
import com.solartrack.service.RequestService;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {
	@Autowired
	 private RequestService requestService;
	
	@PostMapping("/apply")
    public InstallationRequest apply(@RequestBody InstallationRequest request) {
        return requestService.applyForSolar(request);
    }

	@PostMapping("/assign/{id}")
	public InstallationRequest assign(@PathVariable Long id,@RequestBody Installer installer) {
		return requestService.assignInstaller(id, installer);     
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
	
	

}
