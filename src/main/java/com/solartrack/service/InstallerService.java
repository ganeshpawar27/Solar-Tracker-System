package com.solartrack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.solartrack.model.Installer;
import com.solartrack.repository.InstallerRepository;

@Service
public class InstallerService {

	@Autowired
	private InstallerRepository installerRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	public Installer addInstaller(Installer is) {
		String encryptedPassword=passwordEncoder.encode(is.getPassword());
		is.setPassword(encryptedPassword);
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
	public Installer LoginInstaller(Long contactId,String rawPassword) {
		Installer installer =installerRepo.findById(contactId)
				.orElseThrow(()-> new RuntimeException("user Not found"));
		if(passwordEncoder.matches(rawPassword,installer.getPassword())) {
			return installer;
		}
		else {
			throw new RuntimeException("Invalid Password");
		}
	}
	
}
