package com.gamergate.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:5173/")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedMethods("*")
						.allowCredentials(true);
			}
		};
	}

}
