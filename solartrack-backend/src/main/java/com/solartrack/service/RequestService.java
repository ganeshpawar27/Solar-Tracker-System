package com.solartrack.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solartrack.model.InstallationRequest;
import com.solartrack.model.Installer;
import com.solartrack.repository.RequestRepository;

@Service
public class RequestService {
	@Autowired
	private RequestRepository requestRepository;
	
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
	
	public InstallationRequest assignInstaller(Long requestId, Installer installer) {
	    return requestRepository.findById(requestId).map(request -> {
	        request.setInstaller(installer);
	        request.setStatus("Approved");
	        return requestRepository.save(request);
	    }).orElseThrow(() -> new RuntimeException("Bhai, ye Request ID mili hi nahi!"));
	}

}
