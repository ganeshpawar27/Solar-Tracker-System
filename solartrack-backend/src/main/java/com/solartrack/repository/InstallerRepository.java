package com.solartrack.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solartrack.model.Installer;
@Repository
public interface InstallerRepository extends JpaRepository<Installer ,Long> {
	Optional<Installer> findByLicenseNo(String licenseNo);
	Optional<Installer> findByContactId(Long contactId);

}
