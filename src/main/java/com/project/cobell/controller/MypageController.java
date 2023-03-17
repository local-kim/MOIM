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

	@PostMapping("/update/profile/{userId}")
	public void updateProfile(
			@PathVariable Long userId, @RequestParam(required = false) MultipartFile file,
			@RequestPart(value = "bio", required = false) String bio, @RequestPart(value = "hobbyCodes", required = false) List<Integer> hobbyCodes
	){
		// 프로필 사진 업데이트
		if(file != null) {
			// 사진 업로드
			String fileName = mypageService.uploadImage(file);

			// 파일명 insert
			mypageService.insertFileName(userId, fileName);
		}

		// 소개 업데이트
		if(bio != null)
			mypageService.updateBio(userId, bio);

		// 관심사 업데이트
		if(hobbyCodes != null)
			mypageService.updateHobby(userId, hobbyCodes);
	}
}
