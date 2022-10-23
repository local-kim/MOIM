package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.UserDto;
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
//		List<ChallengeDto> l = challengeService.getCountedList();
//		System.out.println(l.get(0));
		return challengeService.getCountedList();
//		return challengeService.getChallengeList();
	}

	@GetMapping("/{challengeId}")
	public ChallengeDto getChallenge(
			@PathVariable Long challengeId
	){
		return challengeService.getChallenge(challengeId);
	}

	@GetMapping("/users/{challengeId}")
	public List<UserDto> getUserList(
			@PathVariable Long challengeId
	){
		return challengeService.getUserList(challengeId);
	}

	@GetMapping("/joined/{challengeId}/{userId}")
	public int isJoined(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		System.out.println("joined");
		return challengeService.isJoined(challengeId, userId);
	}

	@GetMapping("/join/{challengeId}/{userId}")
	public List<UserDto> joinUser(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		challengeService.joinChallenge(challengeId, userId);

		// 새로운 참여중 유저 리스트 반환
		return challengeService.getUserList(challengeId);
	}
}
