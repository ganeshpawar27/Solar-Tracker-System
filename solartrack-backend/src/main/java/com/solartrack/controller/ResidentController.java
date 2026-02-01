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

import com.solartrack.model.Resident;
import com.solartrack.service.ResidentService;

@RestController
@RequestMapping("/api/residents")
@CrossOrigin(origins = "http://localhost:5173") // React ke liye rasta saaf
public class ResidentController {
	@Autowired
	private ResidentService residentService;
	
	
	// 1. Resident ko register karne ka endpoint (POST)
    @PostMapping("/register")
    public ResponseEntity<Resident> register(@RequestBody Resident resident) {
        return ResponseEntity.ok(residentService.registerResident(resident));
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<Resident> getResident(@PathVariable Long id){
		Resident r = residentService.getResident(id);
		return r != null ? ResponseEntity.ok(r) : ResponseEntity.notFound().build();
		}
	
	@GetMapping("/all")
	public List<Resident> all(){
		return residentService.getAllResident();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteResident(@PathVariable Long id){
		residentService.deleteResident(id);
        return ResponseEntity.ok("Resident deleted successfully!");
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Resident> update(@PathVariable Long id,@RequestBody  Resident resident){
		try {
			
			Resident updated=residentService.updateResident(id, resident);
			return ResponseEntity.ok(updated);
		}catch(RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@PostMapping("/login")
	public Resident login(@RequestBody Resident loginData) {
		return residentService.LoginResident(loginData.getContactId(), 
											loginData.getPassword());
	}
	
	
}

