package com.project.cobell.controller;

import com.project.cobell.dto.LoginDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.dto.WeightDto;
import com.project.cobell.entity.User;
import com.project.cobell.entity.Weight;
import com.project.cobell.service.UserService;
import com.project.cobell.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private WeightService weightService;

	@PostMapping("/join")
	public void join(
			@RequestBody UserDto user
			){
//		System.out.println(user);

		userService.join(user);
	}

	@PostMapping("/login")
	public UserDto login(
			@RequestBody LoginDto login
			){
//		System.out.println(login);
//		System.out.println(userService.login(login));
		return userService.login(login);
	}

	@GetMapping("/weight/{userId}")
	public List<WeightDto> getWeightList(
			@PathVariable Long userId
	){
		return weightService.getWeightList(userId);
	}

	@PostMapping("/weight/new")
	public List<WeightDto> insertWeight(
			@RequestBody WeightDto weightDto
	){
//		System.out.println(weightDto);
		weightService.insertWeight(weightDto);
		return weightService.getWeightList(weightDto.getUserId());
	}
}
