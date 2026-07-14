package com.solartrack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.solartrack.SolartrackBackendApplication;
import com.solartrack.model.Resident;
import com.solartrack.repository.ResidentRepository;

@Service
public class ResidentService {

    private final SolartrackBackendApplication solartrackBackendApplication;

    @Autowired
    private ResidentRepository residentRepository;

    ResidentService(SolartrackBackendApplication solartrackBackendApplication) {
        this.solartrackBackendApplication = solartrackBackendApplication;
    }

 // 1. Naya Resident add karna (Create)
    public Resident registerResident(Resident resident) {
        return residentRepository.save(resident);
    }
    
 // 2. Kisi Resident ko delete karna (Delete)
    public void deleteResident(Long id) {
        residentRepository.deleteById(id);
    }
    
 // 3. Ek specific resident ki details dekhna (Read)
    public Resident getResident(Long id) {
        return residentRepository.findById(id).orElse(null);
    }
    
    public List<Resident> getAllResident() {
        return residentRepository.findAll();
    }
    
// 4. Updating resident 
    public Resident updateResident(Long id,Resident updateRes) {
    	return residentRepository.findById(id).map(existResident ->
    	{
    		existResident.setName(updateRes.getName());
    		existResident.setEmail(updateRes.getEmail());
            existResident.setAddress(updateRes.getAddress());
            
            return residentRepository.save(existResident);
    	}).orElseThrow(() -> new RuntimeException("Resident not found with id " + id));
    }
    
// 5. Login Resident
    public Resident LoginResident(Long contactId,String password) {
    	Resident resident = residentRepository.findByContactId(contactId)
                .orElseThrow(() -> new RuntimeException("User nahi mila!"));   
    	
    	if(resident.getPassword().equals(password)) {
    		return resident;
    	}else {
    		throw new RuntimeException("Wrong Credentials");
    	}
    }
    
}