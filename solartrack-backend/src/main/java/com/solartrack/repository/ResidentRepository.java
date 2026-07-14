package com.solartrack.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.solartrack.model.Resident;

@Repository

public interface ResidentRepository extends JpaRepository<Resident,Long> {
	Optional<Resident> findByContactId(Long contactId);
}
