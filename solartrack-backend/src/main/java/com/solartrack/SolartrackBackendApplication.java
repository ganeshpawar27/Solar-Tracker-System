package com.solartrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SolartrackBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SolartrackBackendApplication.class, args);
	}

}
//Client (React)
//↓ HTTP Request
//Controller
//↓
//Service
//↓
//Repository (JPA / DAO)
//↓
//Database
//↑
//Service
//↑
//Controller
//↑ JSON Response
//React UI
