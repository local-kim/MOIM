package com.project.cobell.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	private final String uploadImagesPath;

	public WebConfig(@Value("${custom.path.uploadImage}") String uploadImagesPath){
		this.uploadImagesPath = uploadImagesPath;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry){
		// 기본 static 파일의 경로(classpath:/static/) 대신 외부 경로 설정
		registry.addResourceHandler("/resources/**")    // http://localhost:8080/resources/challenge_photo/img.png
				.addResourceLocations("file:///" + uploadImagesPath)   // file://///Users/hyunji/Documents/Cobell/resources/challenge_photo/img.png
				.setCachePeriod(3600)
				.resourceChain(true)
				.addResolver(new PathResourceResolver());
	}
}
