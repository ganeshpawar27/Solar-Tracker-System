package com.solartrack.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link InstallerService}.
 */
@Generated
public class InstallerService__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static InstallerService apply(RegisteredBean registeredBean, InstallerService instance) {
    AutowiredFieldValueResolver.forRequiredField("installerRepo").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
