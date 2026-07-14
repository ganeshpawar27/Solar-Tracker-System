package com.solartrack.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link ResidentController}.
 */
@Generated
public class ResidentController__BeanDefinitions {
  /**
   * Get the bean definition for 'residentController'.
   */
  public static BeanDefinition getResidentControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(ResidentController.class);
    InstanceSupplier<ResidentController> instanceSupplier = InstanceSupplier.using(ResidentController::new);
    instanceSupplier = instanceSupplier.andThen(ResidentController__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
