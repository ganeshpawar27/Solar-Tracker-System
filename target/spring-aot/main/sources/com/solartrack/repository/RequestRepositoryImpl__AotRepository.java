package com.solartrack.repository;

import com.solartrack.model.InstallationRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.lang.Long;
import java.lang.String;
import java.util.Optional;
import org.springframework.aot.generate.Generated;
import org.springframework.data.jpa.repository.aot.AotRepositoryFragmentSupport;
import org.springframework.data.jpa.repository.query.QueryEnhancerSelector;
import org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport;

/**
 * AOT generated JPA repository implementation for {@link RequestRepository}.
 */
@Generated
public class RequestRepositoryImpl__AotRepository extends AotRepositoryFragmentSupport {
  private final RepositoryFactoryBeanSupport.FragmentCreationContext context;

  private final EntityManager entityManager;

  public RequestRepositoryImpl__AotRepository(EntityManager entityManager,
      RepositoryFactoryBeanSupport.FragmentCreationContext context) {
    super(QueryEnhancerSelector.DEFAULT_SELECTOR, context);
    this.entityManager = entityManager;
    this.context = context;
  }

  /**
   * AOT generated implementation of {@link RequestRepository#findByResidentContactId(java.lang.Long)}.
   */
  public Optional<InstallationRequest> findByResidentContactId(Long contactId) {
    String queryString = "SELECT i FROM InstallationRequest i WHERE i.resident.contactId = :contactId";
    Query query = this.entityManager.createQuery(queryString);
    query.setParameter("contactId", contactId);

    return Optional.ofNullable((InstallationRequest) convertOne(query.getSingleResultOrNull(), false, InstallationRequest.class));
  }
}
