package com.solartrack.controller;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link InstallerController}.
 */
@Generated
public class InstallerController__BeanDefinitions {
  /**
   * Get the bean definition for 'installerController'.
   */
  public static BeanDefinition getInstallerControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(InstallerController.class);
    InstanceSupplier<InstallerController> instanceSupplier = InstanceSupplier.using(InstallerController::new);
    instanceSupplier = instanceSupplier.andThen(InstallerController__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
