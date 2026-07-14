package com.solartrack;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link SolartrackBackendApplication}.
 */
@Generated
public class SolartrackBackendApplication__BeanDefinitions {
  /**
   * Get the bean definition for 'solartrackBackendApplication'.
   */
  public static BeanDefinition getSolartrackBackendApplicationBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(SolartrackBackendApplication.class);
    beanDefinition.setInstanceSupplier(SolartrackBackendApplication::new);
    return beanDefinition;
  }
}
