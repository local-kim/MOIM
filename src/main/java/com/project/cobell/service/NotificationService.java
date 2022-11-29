package com.project.cobell.service;

import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.CommentFeedDto;
import com.project.cobell.dto.LikeFeedDto;
import com.project.cobell.dto.NotificationDto;
import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.Feed;
import com.project.cobell.entity.Notification;
import com.project.cobell.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ChallengeRepository challengeRepository;

	@Autowired
	private FeedRepository feedRepository;

	@Autowired
	private CommentChallengeRepository commentChallengeRepository;

	@Autowired
	private CommentFeedRepository commentFeedRepository;

	@Transactional
	public List<NotificationDto> getNotiList(Long userId){
		List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);

		List<NotificationDto> notificationDtos = new ArrayList<>();
		ModelMapper modelMapper = new ModelMapper();

		for(Notification n: notifications){
			NotificationDto notificationDto = modelMapper.map(n, NotificationDto.class);
			notificationDto.setUserId(n.getUser().getId());
			if(n.getTargetUser() != null)
				notificationDto.setTargetUserNickname(n.getTargetUser().getNickname());
			notificationDto.setTargetPostId(n.getTargetPostId());

			// 챌린지 관련 알림일 경우만
			if(n.getType() < 20)
				notificationDto.setTargetChallengeTitle(challengeRepository.findById(n.getTargetPostId()).get().getTitle());

			// 댓글 알림일 경우만
			if(n.getType() == 2 && n.getTargetCommentId() != null)
				notificationDto.setTargetCommentContent(commentChallengeRepository.findById(n.getTargetCommentId()).get().getContent());
			else if(n.getType() == 21 && n.getTargetCommentId() != null)
				notificationDto.setTargetCommentContent(commentFeedRepository.findById(n.getTargetCommentId()).get().getContent());

			notificationDtos.add(notificationDto);
		}

		return notificationDtos;
	}

	@Transactional
	public void insertJoinNotification(Long challengeId, Long targetUserId){
		Notification notification = new Notification();

		notification.setType(0);    // 참여 알림
//		Long leaderId = challengeRepository.findById(challengeId).get().getLeader().getId();
		Challenge targetChallenge = challengeRepository.findById(challengeId).get();
		notification.setUser(targetChallenge.getLeader());
		notification.setTargetUser(userRepository.findById(targetUserId).get());
//		notification.setChallenge(targetChallenge);
		notification.setTargetPostId(challengeId);
		notification.setCreatedAt(new Timestamp(System.currentTimeMillis()));

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertUnjoinNotification(Long challengeId, Long targetUserId){
		Notification notification = new Notification();

		notification.setType(1);    // 참여 취소 알림
//		Long leaderId = challengeRepository.findById(challengeId).get().getLeader().getId();
		Challenge targetChallenge = challengeRepository.findById(challengeId).get();
		notification.setUser(targetChallenge.getLeader());
		notification.setTargetUser(userRepository.findById(targetUserId).get());
//		notification.setChallenge(targetChallenge);
		notification.setTargetPostId(challengeId);

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertChallengeCommentNotification(CommentChallengeDto commentChallengeDto){
		Notification notification = new Notification();

		notification.setType(2);    // 챌린지 댓글 등록 알림
//		Long leaderId = challengeRepository.findById(commentChallengeDto.getChallengeId()).get().getLeader().getId();
		Challenge targetChallenge = challengeRepository.findById(commentChallengeDto.getChallengeId()).get();
		notification.setUser(targetChallenge.getLeader());
		notification.setTargetUser(userRepository.findById(commentChallengeDto.getUserId()).get());
//		notification.setChallenge(targetChallenge);
		notification.setTargetPostId(commentChallengeDto.getChallengeId());
		notification.setTargetCommentId(commentChallengeDto.getId());

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertApplyNotification(Long challengeId, Long targetUserId){
		Notification notification = new Notification();

		notification.setType(3);    // 챌린지 참여 신청 알림(작성자에게)
		Challenge targetChallenge = challengeRepository.findById(challengeId).get();
		notification.setUser(targetChallenge.getLeader());
		notification.setTargetUser(userRepository.findById(targetUserId).get());
		notification.setTargetPostId(challengeId);

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertApprovedNotification(Long challengeId, Long targetUserId){
		Notification notification = new Notification();

		notification.setType(4);    // 챌린지 참여 승인 알림(신청자에게)
//		Challenge targetChallenge = challengeRepository.findById(challengeId).get();
		notification.setUser(userRepository.findById(targetUserId).get());
//		notification.setTargetUser(userRepository.findById(targetUserId).get());
		notification.setTargetPostId(challengeId);

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertRefusedNotification(Long challengeId, Long targetUserId){
		Notification notification = new Notification();

		notification.setType(5);    // 챌린지 참여 거절 알림(신청자에게)
//		Challenge targetChallenge = challengeRepository.findById(challengeId).get();
		notification.setUser(userRepository.findById(targetUserId).get());
//		notification.setTargetUser(userRepository.findById(targetUserId).get());
		notification.setTargetPostId(challengeId);

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertFeedLikeNotification(LikeFeedDto likeFeedDto){
		Notification notification = new Notification();

		notification.setType(20);    // 피드 좋아요 알림
		Feed targetFeed = feedRepository.findById(likeFeedDto.getFeedId()).get();
		notification.setUser(targetFeed.getUser());
		notification.setTargetUser(userRepository.findById(likeFeedDto.getUserId()).get());
		notification.setTargetPostId(likeFeedDto.getFeedId());

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertFeedCommentNotification(CommentFeedDto commentFeedDto){
		Notification notification = new Notification();

		notification.setType(21);    // 피드 댓글 등록 알림
//		Long leaderId = challengeRepository.findById(commentChallengeDto.getChallengeId()).get().getLeader().getId();
		Feed targetFeed = feedRepository.findById(commentFeedDto.getFeedId()).get();
		notification.setUser(targetFeed.getUser());
		notification.setTargetUser(userRepository.findById(commentFeedDto.getUserId()).get());
		notification.setTargetPostId(commentFeedDto.getFeedId());
		notification.setTargetCommentId(commentFeedDto.getId());

		notificationRepository.save(notification);
	}

	@Transactional
	public void deleteNotification(Long notificationId){
		notificationRepository.deleteById(notificationId);
	}
}
