package com.solartrack.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.solartrack.model.Installer;
import com.solartrack.service.InstallerService;

@RestController
@RequestMapping("/api/installers")
@CrossOrigin(origins = "http://localhost:5173")
public class InstallerController {
	@Autowired
	private InstallerService installerService;
	
	@PostMapping("/add")
	public ResponseEntity<Installer> add(@RequestBody Installer is){
		return ResponseEntity.ok(installerService.addInstaller(is));
	}
	
	@GetMapping("/all")
	public List<Installer> getAll(){
		return installerService.getAllInstaller();
	}
	
	@GetMapping("/{id}")
	public Installer getInstaller(@PathVariable Long id){
		return installerService.getInstaller(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteInstaller(@PathVariable Long id) {
		installerService.deleteInstaller(id);
		return "Installer Deleted";
	}
	
	@PutMapping("/update/{id}")
	public Installer update(@PathVariable Long id,@RequestBody Installer is) {
		try {
			return installerService.updateInstaller(id, is);
		}catch (RuntimeException e) {
	        // Agar error aaya (ID nahi mili), toh null bhej do
	        System.out.println("Error: " + e.getMessage());
	        return null; 
	    }
	}
	
	@PostMapping("/login")
	public Installer login(@RequestBody Installer loginData) {
		return installerService.LoginInstaller(loginData.getContactId(),
												loginData.getPassword());
	}
	

}

