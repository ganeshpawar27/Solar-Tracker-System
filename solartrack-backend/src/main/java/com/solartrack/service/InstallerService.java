package com.solartrack.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solartrack.model.Installer;
import com.solartrack.repository.InstallerRepository;

@Service
public class InstallerService {

	@Autowired
	private InstallerRepository installerRepo;
	
	
	
	public Installer addInstaller(Installer is) {
		return installerRepo.save(is);
	}

	public List<Installer> getAllInstaller() {
		return installerRepo.findAll();
	}
	public Installer getInstaller(Long id) {
		return installerRepo.findById(id).orElse(null);
	}

	public void deleteInstaller( long id) {
		installerRepo.deleteById(id);
	}
	
	public Installer updateInstaller(Long id, Installer updatedDetails) {
	    return installerRepo.findById(id).map(existingInstaller -> {

	    	existingInstaller.setName(updatedDetails.getName());
	        existingInstaller.setEmail(updatedDetails.getEmail());
	        existingInstaller.setName(updatedDetails.getName());
	        
	        return installerRepo.save(existingInstaller); 
	    }).orElseThrow(() -> new RuntimeException("Installer not found with id " + id));
	}
	
// Login Installer
	public Installer LoginInstaller(Long contactId,String password) {
		Installer installer =installerRepo.findById(contactId)
				.orElseThrow(()-> new RuntimeException("user Not found"));
		if(installer.getPassword().equals(password)) {
			return installer;
		}else {
			throw new RuntimeException("Wrong Credentials");
		}
	}
	
}
