package com.project.cobell.service;

import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.NotificationDto;
import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.Notification;
import com.project.cobell.repository.ChallengeRepository;
import com.project.cobell.repository.NotificationRepository;
import com.project.cobell.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

	@Transactional
	public List<NotificationDto> getNotiList(Long userId){
		List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);

		List<NotificationDto> notificationDtos = new ArrayList<>();
		ModelMapper modelMapper = new ModelMapper();

		for(Notification n: notifications){
			NotificationDto notificationDto = modelMapper.map(n, NotificationDto.class);
			notificationDto.setUserId(n.getUser().getId());
			notificationDto.setTargetUserNickname(n.getTargetUser().getNickname());
			notificationDto.setChallengeId(n.getChallenge().getId());
			notificationDto.setChallengeTitle(n.getChallenge().getTitle());

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
		notification.setChallenge(targetChallenge);

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
		notification.setChallenge(targetChallenge);

		notificationRepository.save(notification);
	}

	@Transactional
	public void insertCommentNotification(CommentChallengeDto commentChallengeDto){
		Notification notification = new Notification();

		notification.setType(1);    // 댓글 등록 알림
//		Long leaderId = challengeRepository.findById(commentChallengeDto.getChallengeId()).get().getLeader().getId();
		Challenge targetChallenge = challengeRepository.findById(commentChallengeDto.getChallengeId()).get();
		notification.setUser(targetChallenge.getLeader());
		notification.setTargetUser(userRepository.findById(commentChallengeDto.getUserId()).get());
		notification.setChallenge(targetChallenge);

		notificationRepository.save(notification);
	}
}
