package com.solartrack.service;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link InstallerService}.
 */
@Generated
public class InstallerService__BeanDefinitions {
  /**
   * Get the bean definition for 'installerService'.
   */
  public static BeanDefinition getInstallerServiceBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(InstallerService.class);
    InstanceSupplier<InstallerService> instanceSupplier = InstanceSupplier.using(InstallerService::new);
    instanceSupplier = instanceSupplier.andThen(InstallerService__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
