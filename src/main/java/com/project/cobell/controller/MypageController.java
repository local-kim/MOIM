package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.UpdateProfileDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.service.MypageService;
import com.project.cobell.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
public class MypageController {

	@Autowired
	private MypageService mypageService;

	@Autowired
	private UserService userService;

	@GetMapping("/user/{userId}")
	public UserDto getUser(
			@PathVariable Long userId
	){
		return userService.getUser(userId);
	}

	@GetMapping("/created/{userId}")
	public List<ChallengeDto> getMyChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getMyChallengeList(userId);
	}

	@GetMapping("/joined/{userId}")
	public List<ChallengeDto> getJoinedChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getJoinedChallengeList(userId);
	}

	@GetMapping("/liked/{userId}")
	public List<ChallengeDto> getLikedChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getLikedChallengeList(userId);
	}

	@PostMapping("/update/photo/{userId}")
	public void updatePhoto(
			@PathVariable Long userId, @RequestParam MultipartFile file
	){
		// userId 받기

		// 사진 업로드
		String fileName = mypageService.uploadImage(file);

		// 파일명 insert
		mypageService.insertFileName(userId, fileName);
	}

	@PostMapping("/update/bio/{userId}")
	public void updateBio(
			@PathVariable Long userId, @RequestBody UpdateProfileDto updateProfileDto
			){
		// userId 받기
		mypageService.updateBio(userId, updateProfileDto.getBio());

	}
}
