package com.project.cobell.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController implements ErrorController {
	// react router url을 spring url로 인식해 오류 페이지를 반환할 경우
	@GetMapping({"/", "/error"})
	public String index() {
		return "index.html";
	}

//	@Override
//	public String getErrorPath() {
//		return "/error";
//	}
}
