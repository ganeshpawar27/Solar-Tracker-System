package com.solartrack.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link ResidentController}.
 */
@Generated
public class ResidentController__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static ResidentController apply(RegisteredBean registeredBean,
      ResidentController instance) {
    AutowiredFieldValueResolver.forRequiredField("residentService").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
