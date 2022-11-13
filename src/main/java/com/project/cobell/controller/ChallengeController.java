package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.LikeChallengeDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.service.ChallengeService;
import com.project.cobell.service.NotificationService;
import com.project.cobell.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;

	@Autowired
	private NotificationService notificationService;

	@PostMapping("/new")
	public Long createChallenge(
//			@RequestBody ChallengeDto challengeDto
			@RequestPart("data") ChallengeDto challengeDto, @RequestPart MultipartFile file
//			HttpServletRequest request
			){
		System.out.println(challengeDto);

		// 사진 업로드
		String fileName = challengeService.uploadImage(file);

		// 챌린지 insert
		Long challengeId = challengeService.createChallenge(challengeDto);

		// 파일명 insert
		challengeService.insertFileName(challengeId, fileName);

		// 챌린지 id 반환
		return challengeId;
	}

	@DeleteMapping("/delete/{challengeId}")
	public void deleteChallenge(
			@PathVariable Long challengeId
	){
		challengeService.deleteChallenge(challengeId);
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
		// join 테이블에 insert
		challengeService.insertJoinedUser(challengeId, userId);

		// notification 테이블에 참여 알림 insert
		notificationService.insertJoinNotification(challengeId, userId);

		// 새로운 참여중 유저 리스트 반환
		return challengeService.getUserList(challengeId);
	}

	@GetMapping("/unjoin/{challengeId}/{userId}")
	public List<UserDto> unjoinUser(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		// join 테이블에서 delete
		challengeService.deleteJoinedUser(challengeId, userId);

		// notification 테이블에 참여 알림 insert
		notificationService.insertUnjoinNotification(challengeId, userId);

		// 새로운 참여중 유저 리스트 반환
		return challengeService.getUserList(challengeId);
	}

	@PostMapping("/comment/new")
	public List<CommentChallengeDto> createComment(
			@RequestBody CommentChallengeDto commentChallengeDto
			){
//		System.out.println(commentChallengeDto.toString());
		challengeService.createComment(commentChallengeDto);

		// notification 테이블에 댓글 알림 insert
		notificationService.insertCommentNotification(commentChallengeDto);

		return challengeService.getCommentList(commentChallengeDto.getChallengeId());
	}

	@DeleteMapping("/comment/delete")
	public List<CommentChallengeDto> deleteComment(
			@RequestBody CommentChallengeDto commentChallengeDto
	){
		challengeService.deleteComment(commentChallengeDto.getId());

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

	@GetMapping("/like/list/{userId}")
	public List<Long> getLikeList(
			@PathVariable Long userId
	){
		return challengeService.getLikeList(userId);
	}
}
