package com.solartrack.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link ResidentService}.
 */
@Generated
public class ResidentService__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static ResidentService apply(RegisteredBean registeredBean, ResidentService instance) {
    AutowiredFieldValueResolver.forRequiredField("residentRepository").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
