package com.solartrack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solartrack.model.InstallationRequest;

@Repository
public interface RequestRepository extends JpaRepository<InstallationRequest, Long> {
	
	Optional<InstallationRequest> findByResidentContactId(Long contactId);
}
