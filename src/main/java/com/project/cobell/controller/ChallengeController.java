package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;

	@PostMapping("/new")
	public void createChallenge(
			@RequestBody ChallengeDto challengeDto
			){
		System.out.println(challengeDto);
	}
}
