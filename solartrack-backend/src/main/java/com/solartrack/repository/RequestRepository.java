package com.solartrack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solartrack.model.InstallationRequest;

@Repository
public interface RequestRepository extends JpaRepository<InstallationRequest, Long> {
	
	List<InstallationRequest> findByResidentContactId(Long contactId);
	List<InstallationRequest> findByStatus(String status);
	List<InstallationRequest> findByInstallerContactId(Long contactId);

}
