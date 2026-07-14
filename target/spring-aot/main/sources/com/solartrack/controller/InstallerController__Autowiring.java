package com.solartrack.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link InstallerController}.
 */
@Generated
public class InstallerController__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static InstallerController apply(RegisteredBean registeredBean,
      InstallerController instance) {
    AutowiredFieldValueResolver.forRequiredField("installerService").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
