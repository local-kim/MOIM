package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.LoginDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.dto.WeightDto;
import com.project.cobell.entity.User;
import com.project.cobell.entity.Weight;
import com.project.cobell.service.MypageService;
import com.project.cobell.service.UserService;
import com.project.cobell.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private MypageService mypageService;

	@Autowired
	private WeightService weightService;

	@PostMapping("")
	public void join(
			@RequestBody UserDto user
	){
		System.out.println(user);

		userService.join(user);
	}

	@PostMapping("/check-email")
	public int checkEmail(
			@RequestBody LoginDto login
	){
//		System.out.println(login.getEmail());
//		System.out.println(userService.checkEmail(login.getEmail()));

		return userService.checkEmail(login.getEmail());
	}

	@PostMapping("/login")
	public UserDto login(
			@RequestBody LoginDto login
	){
//		System.out.println(login);
//		System.out.println(userService.login(login));
		return userService.login(login);
	}

	@GetMapping("/{userId}/weights")
	public List<WeightDto> getWeightList(
			@PathVariable Long userId
	){
		return weightService.getWeightList(userId);
	}

	@PostMapping("/weight")
	public List<WeightDto> insertWeight(
			@RequestBody WeightDto weightDto
	){
//		System.out.println(weightDto);
		weightService.insertWeight(weightDto);
		return weightService.getWeightList(weightDto.getUserId());
	}

	@GetMapping("/{userId}")
	public UserDto getUser(
			@PathVariable Long userId
	){
		return userService.getUser(userId);
	}

	@GetMapping("/{userId}/created")
	public List<ChallengeDto> getMyChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getMyChallengeList(userId);
	}

	@GetMapping("/{userId}/joined")
	public List<ChallengeDto> getJoinedChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getJoinedChallengeList(userId);
	}

	@GetMapping("/{userId}/liked")
	public List<ChallengeDto> getLikedChallengeList(
			@PathVariable Long userId
	){
		return mypageService.getLikedChallengeList(userId);
	}

	@PatchMapping("/{userId}")
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
