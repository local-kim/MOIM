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
	public Long createChallenge(
			@RequestBody ChallengeDto challengeDto
			){
//		System.out.println(challengeDto);
		return challengeService.createChallenge(challengeDto);

		// 만들어진 챌린지 id를 반환
	}

	@GetMapping("/list")
	public List<ChallengeDto> getList(){
		return challengeService.getChallengeList();
	}

	@GetMapping("/{challengeId}")
	public ChallengeDto getChallenge(
			@PathVariable Long challengeId
	){
		return challengeService.getChallenge(challengeId);
	}
}
