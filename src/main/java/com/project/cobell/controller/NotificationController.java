package com.project.cobell.controller;

import com.project.cobell.dto.NotificationDto;
import com.project.cobell.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/noti")
public class NotificationController {

	@Autowired
	private NotificationService notificationService;

	@GetMapping("/{userId}")
	public List<NotificationDto> getNotiList(
			@PathVariable Long userId
	){
		return notificationService.getNotiList(userId);
	}
}
