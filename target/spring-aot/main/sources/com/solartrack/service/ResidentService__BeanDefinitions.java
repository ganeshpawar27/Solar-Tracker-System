package com.solartrack.service;

import com.solartrack.SolartrackBackendApplication;
import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.BeanInstanceSupplier;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link ResidentService}.
 */
@Generated
public class ResidentService__BeanDefinitions {
  /**
   * Get the bean instance supplier for 'residentService'.
   */
  private static BeanInstanceSupplier<ResidentService> getResidentServiceInstanceSupplier() {
    return BeanInstanceSupplier.<ResidentService>forConstructor(SolartrackBackendApplication.class)
            .withGenerator((registeredBean, args) -> new ResidentService(args.get(0)));
  }

  /**
   * Get the bean definition for 'residentService'.
   */
  public static BeanDefinition getResidentServiceBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(ResidentService.class);
    InstanceSupplier<ResidentService> instanceSupplier = getResidentServiceInstanceSupplier();
    instanceSupplier = instanceSupplier.andThen(ResidentService__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
