package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.LikeChallengeDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
		System.out.println(challengeDto);
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

	@PostMapping("/comment/new")
	public List<CommentChallengeDto> createComment(
			@RequestBody CommentChallengeDto commentChallengeDto
			){
//		System.out.println(commentChallengeDto.toString());
		challengeService.createComment(commentChallengeDto);

		return challengeService.getCommentList(commentChallengeDto.getChallengeId());
	}

	@GetMapping("/comment/list/{challengeId}")
	public List<CommentChallengeDto> getCommentList(
			@PathVariable Long challengeId
	){
		return challengeService.getCommentList(challengeId);
	}

	@PostMapping("/like/insert")
	public void insertLike(
			@RequestBody LikeChallengeDto likeChallengeDto
			){
		challengeService.insertLike(likeChallengeDto);
	}

	@GetMapping("/like/{challengeId}/{userId}")
	public int getLike(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
//		System.out.println(challengeService.getLike(challengeId, userId));
		return challengeService.getLike(challengeId, userId);
	}

	@DeleteMapping("/like/delete")
	public void deleteLike(
			@RequestBody LikeChallengeDto likeChallengeDto
	){
		challengeService.deleteLike(likeChallengeDto);
	}
}