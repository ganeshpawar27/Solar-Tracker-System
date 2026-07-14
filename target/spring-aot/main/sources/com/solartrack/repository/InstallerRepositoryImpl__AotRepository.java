package com.solartrack.repository;

import com.solartrack.model.Installer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.lang.String;
import java.util.Optional;
import org.springframework.aot.generate.Generated;
import org.springframework.data.jpa.repository.aot.AotRepositoryFragmentSupport;
import org.springframework.data.jpa.repository.query.QueryEnhancerSelector;
import org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport;

/**
 * AOT generated JPA repository implementation for {@link InstallerRepository}.
 */
@Generated
public class InstallerRepositoryImpl__AotRepository extends AotRepositoryFragmentSupport {
  private final RepositoryFactoryBeanSupport.FragmentCreationContext context;

  private final EntityManager entityManager;

  public InstallerRepositoryImpl__AotRepository(EntityManager entityManager,
      RepositoryFactoryBeanSupport.FragmentCreationContext context) {
    super(QueryEnhancerSelector.DEFAULT_SELECTOR, context);
    this.entityManager = entityManager;
    this.context = context;
  }

  /**
   * AOT generated implementation of {@link InstallerRepository#findByLicenseNo(java.lang.String)}.
   */
  public Optional<Installer> findByLicenseNo(String licenseNo) {
    String queryString = "SELECT i FROM Installer i WHERE i.licenseNo = :licenseNo";
    Query query = this.entityManager.createQuery(queryString);
    query.setParameter("licenseNo", licenseNo);

    return Optional.ofNullable((Installer) convertOne(query.getSingleResultOrNull(), false, Installer.class));
  }
}
