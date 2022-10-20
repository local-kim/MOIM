package com.project.cobell.controller;

import com.project.cobell.dto.LoginDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.entity.User;
import com.project.cobell.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/join")
	public void join(
			@RequestBody UserDto user
			){
//		System.out.println(user);

		userService.join(user);
	}

	@PostMapping("/login")
	public Optional<User> login(
			@RequestBody LoginDto login
			){
//		System.out.println(login);
//		System.out.println(userService.login(login));
		return userService.login(login);
	}
}
