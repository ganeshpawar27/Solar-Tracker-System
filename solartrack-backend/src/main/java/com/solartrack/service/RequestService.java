package com.solartrack.service;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solartrack.model.InstallationRequest;
import com.solartrack.model.Installer;
import com.solartrack.repository.InstallerRepository;
import com.solartrack.repository.RequestRepository;

@Service
public class RequestService {
	@Autowired
	private RequestRepository requestRepository;
	@Autowired
	private InstallerRepository installerRepository;
	
	public InstallationRequest applyForSolar(InstallationRequest request) {
		request.setStatus("Pending"); // Shuruwat mein hamesha pending rahega
	    request.setRequestDate(LocalDate.now()); // Aaj ki date set kar do
	    return requestRepository.save(request);
	}
	
	public List<InstallationRequest> getAllRequests(){
		return requestRepository.findAll();
	}
	public InstallationRequest getRequest(Long id){
		return requestRepository.findById(id).orElse(null);
	}
	
	public void deleteRequest(Long id){
		requestRepository.deleteById(id);
	}
	
	public InstallationRequest assignInstaller(Long requestId, Long installerId) {
        // 1. Installer ko database se fetch karo (Managed Object)
        Installer installer = installerRepository.findById(installerId)
                .orElseThrow(() -> new RuntimeException("Bhai, Installer nahi mila!"));

        // 2. Request dhundo
        return requestRepository.findById(requestId).map(request -> {
            request.setInstaller(installer); // Installer link karo
            request.setStatus("Assigned");   // Status change karo
            return requestRepository.save(request); // Save karo
        }).orElseThrow(() -> new RuntimeException("Bhai, Request nahi mili!"));
    }

	public List<InstallationRequest> getRequestsByResidentId(Long residentId) {
	    return requestRepository.findByResidentContactId(residentId);
	}
	public List<InstallationRequest> getRequestByInstallerId(Long installerId){
		return requestRepository.findByInstallerContactId(installerId);
	}
	public List<InstallationRequest> getPendingRequests() {
        return requestRepository.findByStatus("Pending");
    }
	public List<InstallationRequest> getApprovedRequests() {
        return requestRepository.findByStatus("Approved");
    }
	public List<InstallationRequest> getCompletedRequests(){
		return requestRepository.findByStatus("completed");
	}
	
	public InstallationRequest updateStatus(Long id, String status) {
		InstallationRequest request = requestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));
        
        request.setStatus(status);
        return requestRepository.save(request);
    }

}
