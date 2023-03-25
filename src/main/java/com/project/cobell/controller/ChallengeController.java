package com.project.cobell.controller;

import com.project.cobell.dto.*;
import com.project.cobell.service.ChallengeService;
import com.project.cobell.service.NotificationService;
import com.project.cobell.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;

	@Autowired
	private NotificationService notificationService;

	@PostMapping("/challenge")
	public Long createChallenge(
//			@RequestBody ChallengeDto challengeDto
			@RequestPart("data") ChallengeDto challengeDto, @RequestPart MultipartFile file
//			HttpServletRequest request
			){
//		System.out.println(challengeDto);

		// 사진 업로드
		String fileName = challengeService.uploadImage(file);

		// 챌린지 insert
		Long challengeId = challengeService.createChallenge(challengeDto);

		// 파일명 insert
		challengeService.insertFileName(challengeId, fileName);

		// 챌린지 id 반환
		return challengeId;
	}

	@DeleteMapping("/challenge/{challengeId}")
	public void deleteChallenge(
			@PathVariable Long challengeId
	){
		challengeService.deleteChallenge(challengeId);

		// 알림 삭제
		notificationService.deleteChallengeNotification(challengeId);
	}

	@GetMapping("/challenges")
	public List<ChallengeDto> getList(){
//		List<ChallengeDto> l = challengeService.getCountedList();
//		System.out.println(l.get(0));
		return challengeService.getCountedList();
//		return challengeService.getChallengeList();
	}

	@GetMapping("/challenge/{challengeId}")
	public ChallengeDto getChallenge(
			@PathVariable Long challengeId
	){
		return challengeService.getChallenge(challengeId);
	}

	@GetMapping("/challenge/{challengeId}/users")
	public List<UserDto> getUserList(
			@PathVariable Long challengeId
	){
		return challengeService.getUserList(challengeId);
	}

	@GetMapping("/challenge/{challengeId}/user/{userId}")
	public int isJoined(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		return challengeService.isJoined(challengeId, userId);
	}

	@PostMapping("/challenge/{challengeId}/user/{userId}")
	public ResponseEntity<List<UserDto>> joinUser(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		// 선착순
		// join 테이블에 승인으로 insert
		if(!challengeService.insertJoinedUser(challengeId, userId, 1)){
			// 상태코드, 유저 리스트 반환
			return ResponseEntity.internalServerError().body(challengeService.getUserList(challengeId));
		}

		// notification 테이블에 참여 알림 insert
		notificationService.insertJoinNotification(challengeId, userId);

		// 새로운 참여중 유저 리스트 반환
		// 상태코드와 바디 반환(두 표현 모두 사용 가능)
		return ResponseEntity.ok(challengeService.getUserList(challengeId));
//		return ResponseEntity.status(HttpStatus.OK).body(challengeService.getUserList(challengeId));
	}

	@PostMapping("/challenge/{challengeId}/apply/{userId}")
	public List<UserDto> applyUser(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
		// 승인제
		// join 테이블에 대기중으로 insert
		challengeService.insertJoinedUser(challengeId, userId, 2);

		// notification 테이블에 참여 요청 알림 insert
		notificationService.insertApplyNotification(challengeId, userId);

		// 새로운 참여중 유저 리스트 반환
		return challengeService.getUserList(challengeId);
	}

	@PostMapping("/challenge/approve")
	public ResponseEntity<List<NotificationDto>> approveUser(
			@RequestBody NotificationDto notificationDto
	){
//		System.out.println(notificationDto);

		// join_challenge 테이블의 status 변경
		if(!challengeService.updateJoinStatus(notificationDto.getTargetPostId(), notificationDto.getTargetUserId(), 1)){
			// 모집 인원이 다 찼을 경우
			// 상태코드만 반환
			return ResponseEntity.internalServerError().build();
		}

		// 작성자의 신청 알림 삭제
		notificationService.deleteNotification(notificationDto.getId());

		// 작성자에 참여 알림 추가
		notificationService.insertJoinNotification(notificationDto.getTargetPostId(), notificationDto.getTargetUserId());

		// 신청자에 승인 알림 추가
		notificationService.insertApprovedNotification(notificationDto.getTargetPostId(), notificationDto.getTargetUserId());

		return ResponseEntity.ok(notificationService.getNotiList(notificationDto.getUserId()));
	}

	@PostMapping("/challenge/refuse")
	public List<NotificationDto> refuseUser(
			@RequestBody NotificationDto notificationDto
	){
//		System.out.println(notificationDto);

		// join_challenge 테이블에서 삭제
		challengeService.deleteJoinedUser(notificationDto.getTargetPostId(), notificationDto.getTargetUserId());
//		challengeService.updateJoinStatus(notificationDto.getTargetPostId(), notificationDto.getTargetUserId(), 1);

		// 작성자의 신청 알림 삭제
		notificationService.deleteNotification(notificationDto.getId());

		// 작성자에 참여 알림 추가
//		notificationService.insertJoinNotification(notificationDto.getTargetPostId(), notificationDto.getTargetUserId());

		// 신청자에 거절 알림 추가
		notificationService.insertRefusedNotification(notificationDto.getTargetPostId(), notificationDto.getTargetUserId());

		return notificationService.getNotiList(notificationDto.getUserId());
	}

	@DeleteMapping("/challenge/{challengeId}/user/{userId}")
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

	@PostMapping("/challenge/comment")
	public List<CommentChallengeDto> createComment(
			@RequestBody CommentChallengeDto commentChallengeDto
			){
//		System.out.println(commentChallengeDto.toString());
		Long commentId = challengeService.createComment(commentChallengeDto);

		// notification 테이블에 댓글 알림 insert
		commentChallengeDto.setId(commentId);
		notificationService.insertChallengeCommentNotification(commentChallengeDto);

		return challengeService.getCommentList(commentChallengeDto.getChallengeId());
	}

	@DeleteMapping("/challenge/comment")
	public List<CommentChallengeDto> deleteComment(
			@RequestBody CommentChallengeDto commentChallengeDto
	){
		challengeService.deleteComment(commentChallengeDto.getId());
		notificationService.deleteChallengeCommentNotification(commentChallengeDto.getId());

		return challengeService.getCommentList(commentChallengeDto.getChallengeId());
	}

	@GetMapping("/challenge/{challengeId}/comments")
	public List<CommentChallengeDto> getCommentList(
			@PathVariable Long challengeId
	){
		return challengeService.getCommentList(challengeId);
	}

	@PostMapping("/challenge/like")
	public void insertLike(
			@RequestBody LikeChallengeDto likeChallengeDto
			){
		challengeService.insertLike(likeChallengeDto);
	}

	@GetMapping("/challenge/{challengeId}/like/{userId}")
	public int getLike(
			@PathVariable Long challengeId, @PathVariable Long userId
	){
//		System.out.println(challengeService.getLike(challengeId, userId));
		return challengeService.getLike(challengeId, userId);
	}

	@DeleteMapping("/challenge/like")
	public void deleteLike(
			@RequestBody LikeChallengeDto likeChallengeDto
	){
		challengeService.deleteLike(likeChallengeDto);
	}

	@GetMapping("/challenge/user/{userId}/likes")
	public List<Long> getLikeList(
			@PathVariable Long userId
	){
		return challengeService.getLikeList(userId);
	}
}
