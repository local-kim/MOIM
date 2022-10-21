package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;

	@PostMapping("/new")
	public void createChallenge(
			@RequestBody ChallengeDto challengeDto
			){
//		LocalDateTime now = LocalDateTime.now();
//		System.out.println(now.toString());
		System.out.println(challengeDto);
		challengeService.createChallenge(challengeDto);

		// 챌린지 만든 유저를 join_challenge 테이블에 insert

		// 만들어진 챌린지 id를 반환
	}

	@GetMapping("/list")
	public List<ChallengeDto> getList(){
		return challengeService.getChallengeList();
	}
}
