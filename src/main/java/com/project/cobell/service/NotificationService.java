package com.project.cobell.service;

import com.project.cobell.dto.NotificationDto;
import com.project.cobell.entity.Notification;
import com.project.cobell.repository.NotificationRepository;
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
}
