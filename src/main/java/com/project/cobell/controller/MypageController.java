package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageController {

	@Autowired
	private MypageService mypageService;

	@GetMapping("/created/{userId}")
	public List<ChallengeDto> getMyChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getMyChallengeList(userId);
	}
}
